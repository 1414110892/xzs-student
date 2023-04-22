import { websocketStore } from '@/store/websokcet.js'
let url = 'ws://127.0.0.1:8010/ws' // 请求的后端地址

const socket = {
  websocket: null,
  init: () => {
    socket.websocket = new WebSocket(url)
    socket.websocket.onmessage = (e) => {
      let data = JSON.parse(e.data)
      if (data.type === 3) {
        console.log(data)
        window.location.href = '/do?from=' + data.from + '&type=3'
      } else {
        const web = websocketStore()
        web.msg = e.data
      }
    }
    socket.websocket.onclose = (e) => {
      console.log(e)
    }
  },
  send: (e) => {
    if (socket.websocket.readyState === 0) {
      setTimeout(() => {
        socket.websocket.send(JSON.stringify(e))
      }, 1000)
    } else {
      socket.websocket.send(JSON.stringify(e))
    }
  }
}

export default socket
