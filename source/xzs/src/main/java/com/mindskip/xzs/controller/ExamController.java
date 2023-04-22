package com.mindskip.xzs.controller;

import com.alibaba.fastjson.JSONObject;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.mime.content.ByteArrayBody;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

/**
 * @Author：ycx
 * @Date：2023/4/13 10:25
 * @Filename：ExamController
 */
@Controller
@RestController
public class ExamController {
    // 定义人脸识别API
    private static final String FACE_API_URL = "https://api-cn.faceplusplus.com/facepp/v3/compare";

    // 定义API Key和API Secret
    private static final String API_KEY = "qsyfHNCynLOG5So6qEaWAabOe_aeH3Sm";
    private static final String API_SECRET = "ZkhNatzjDFdtYyaDEwcOpVLkzcQ8Mw6O";

    // 定义阈值，用于判断人脸相似度
    private static final double THRESHOLD = 70.0;

    /**
     * 拍照函数
     * @param file 考生上传的照片
     * @return 考生照片的base64编码
     * @throws IOException
     */
    private String capture(MultipartFile file) throws IOException {
        // 将MultipartFile转换为BufferedImage
        BufferedImage image = ImageIO.read(file.getInputStream());

        // 将BufferedImage转换为byte数组
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(image, "jpg", baos);
        byte[] bytes = baos.toByteArray();

        // 将byte数组转换为base64编码
        String base64 = java.util.Base64.getEncoder().encodeToString(bytes);

        return base64;
    }

    /**
     * 人脸比对函数
     * @param base64_1 考生照片的base64编码
     * @param base64_2 进入考试前拍摄的照片的base64编码
     * @return 是否匹配成功
     * @throws IOException
     */
    private boolean compareFaces(String base64_1, String base64_2) throws IOException {
        // 创建HttpClient对象
        CloseableHttpClient httpClient = HttpClients.createDefault();

        // 创建HttpPost对象
        HttpPost httpPost = new HttpPost(FACE_API_URL);

        // 创建MultipartEntityBuilder对象
        MultipartEntityBuilder builder = MultipartEntityBuilder.create();

        // 添加API Key和API Secret
        builder.addTextBody("api_key", API_KEY);
        builder.addTextBody("api_secret", API_SECRET);

        // 添加考生照片
        ByteArrayBody bab1 = new ByteArrayBody(java.util.Base64.getDecoder().decode(base64_1), "photo.jpg");
        builder.addPart("image_file1", bab1);

        // 添加进入考试前拍摄的照片
        ByteArrayBody bab2 = new ByteArrayBody(java.util.Base64.getDecoder().decode(base64_2), "pre_photo.jpg");
        builder.addPart("image_file2", bab2);

        // 设置请求实体
        HttpEntity httpEntity = builder.build();
        httpPost.setEntity(httpEntity);

        // 发送请求，获取响应
        HttpResponse response = httpClient.execute(httpPost);
        HttpEntity entity = response.getEntity();

        // 解析响应，获取人脸相似度
        JSONObject jsonObject = new JSONObject(Boolean.parseBoolean(EntityUtils.toString(entity)));
        double confidence = jsonObject.getDouble("confidence");

        // 判断人脸相似度是否达到阈值
        if (confidence >= THRESHOLD) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 考试提交函数
     * @param file 考生上传的照片
     * @return 考试结果
     * @throws IOException
     */
    @PostMapping("/submit")
    public String submit(MultipartFile file) throws IOException {
        // 调用拍照函数，拍摄考生照片
        String base64_1 = capture(file);

        // 调用比对函数，比对考生照片和进入考试前拍摄的照片
        String base64_2 = "pre_photo_base64";// 这里需要替换为进入考试前拍摄的照片的base64编码
        if (compareFaces(base64_1, base64_2)) {
// 人脸匹配成功，考试继续进行
            return "考试通过。";
        } else {
// 人脸匹配失败，考试中止
            return "考试未通过。";
        }
    }
}
