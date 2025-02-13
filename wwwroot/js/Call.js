const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
let peerConnection;
let localStream;

const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

// Получение медиапотока
async function startLocalStream() {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideo.srcObject = localStream;
    } catch (error) {
        console.error('Error accessing media devices:', error);
    }
}

// Инициализация RTCPeerConnection
function createPeerConnection() {
    peerConnection = new RTCPeerConnection(configuration);

    // Добавление локального потока в соединение
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

    // Обработка удаленного потока
    peerConnection.ontrack = event => {
        remoteVideo.srcObject = event.streams[0];
    };

    // Обработка ICE кандидатов
    peerConnection.onicecandidate = event => {
        if (event.candidate) {
            connection.invoke("SendSignal", JSON.stringify({ ice: event.candidate }), selectedUserId);
        }
    };
}

// Инициализация вызова
async function startCall(selectedUserId) {
    await startLocalStream();
    createPeerConnection();

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    connection.invoke("SendSignal", JSON.stringify({ sdp: peerConnection.localDescription }), selectedUserId);
}

// Обработка ответа (answer)
async function handleAnswer(answer) {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
}

// Завершение вызова
function endCall() {
    if (peerConnection) {
        peerConnection.close();
        peerConnection = null;
    }
    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        localStream = null;
    }
    localVideo.srcObject = null;
    remoteVideo.srcObject = null;
}

// Подключение к SignalR
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/callHub")
    .build();

connection.on("ReceiveSignal", async signal => {
    const data = JSON.parse(signal);
    if (data.sdp) {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.sdp));
        if (data.sdp.type === 'offer') {
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);
            connection.invoke("SendSignal", JSON.stringify({ sdp: peerConnection.localDescription }), selectedUserId);
        }
    } else if (data.ice) {
        await peerConnection.addIceCandidate(new RTCIceCandidate(data.ice));
    }
});

connection.start().catch(err => console.error(err));



