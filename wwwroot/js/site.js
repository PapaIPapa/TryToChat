////document.addEventListener('DOMContentLoaded', function () {
////    const userSearchInput = document.getElementById('userSearch');
////    const searchResults = document.getElementById('searchResults');
////    const messageInputArea = document.getElementById('messageInputArea');
////    const messageInput = document.getElementById('messageInput');
////    const sendMessageButton = document.getElementById('sendMessageButton');
////    const messageArea = document.getElementById('messageArea');
////    const messagesWith = document.getElementById('messagesWith');

////    const connectionCall = new signalR.HubConnectionBuilder()
////    .withUrl("/callHub")
////    .withAutomaticReconnect()
////    .build();


////    // Получаем элементы модального окна и кнопки
////    const modal = document.getElementById("addGroupModal");
////    const addGroupButton = document.getElementById("addGroupButton");
////    const closeButton = document.getElementsByClassName("close-button");
////    const createGroupButton = document.getElementById("createGroupButton");
////    const groupNameInput = document.getElementById("groupNameInput");

////    // Получаем элементы модального окна и кнопки
////    const modalUser = document.getElementById("addUserModal");
////    const addToGroup = document.getElementById("addToGroup");
////    const addUserButton = document.getElementById("addUserButton");
////    const userGroupSearch = document.getElementById("userGroupSearch");


////    addToGroup.onclick = function() 
////    {
////        modalUser.style.display = "block";
////    }


////    // Открытие модального окна при нажатии на кнопку "Add Group"
////addGroupButton.onclick = function() {
////    modal.style.display = "block";
////}

////// Закрытие модального окна при нажатии на "x"
////closeButton.onclick = function() {
////    modal.style.display = "none";
////    modalUser.style.display = "none";
////}

////// Закрытие модального окна при нажатии вне его
////window.onclick = function(event) {
////    if (event.target == modal || event.target == modalUser) {
////        modal.style.display = "none";
////        modalUser.style.display = "none";
////    }
////}


////// Обработка создания группы
////createGroupButton.onclick = async function() {
////    const groupName = groupNameInput.value;
////    var userId = currentUser.id;
////    console.log(userId);
////    if (groupName) {
////        try {
////            // Отправка данных на сервер
////            const response = await fetch('/Group/CreateGroup', {
////                method: 'POST',
////                headers: {
////                    'Content-Type': 'application/json',
////                },
////                body: JSON.stringify({ groupName: groupName, userId: userId }),
////            });

////            if (response.ok) {
////                // Если группа успешно создана, закрываем модальное окно и обновляем страницу
////                modal.style.display = "none";
////                groupNameInput.value = "";
////                window.location.reload(); // Обновляем страницу для отображения новой группы
////            } else {
////                // Обработка ошибок
////                const errorData = await response.json();
////                alert(`Ошибка: ${errorData}`);
////            }
////        } catch (error) {
////            console.error('Ошибка при создании группы:', error);
////            alert('Произошла ошибка при создании группы.');
////        }
////    } else {
////        alert("Пожалуйста, введите название группы.");
////    }
////}


    


////    let selectedUserId = null;
////    let currentUser = null;
////    let selectedGroupId = null;
////    let inCallWithId = null;
////    let selectedType = null;

////async function fetchUser() {
////    try {
////        const response = await fetch('/Home/GetUser');
        
////        // Проверка статуса ответа
////        if (!response.ok) {
////            throw new Error(`Network response was not ok: ${response.statusText}`);
////        }
        
////        const user = await response.json();
        
////        // Проверка, что user и user.userName существуют
////        if (user && user.userName) {
////            currentUser = user; 
////            console.log(currentUser);
////            checkUnfinishedCalls(currentUser.id);
////        } else {
////            throw new Error('User  data is not in the expected format');
////        }
////    } catch (error) {
////        console.error('Error fetching user data:', error);
////    }
////}

////fetchUser();


////async function checkUnfinishedCalls(userId) {
////    try {
////        // Отправляем GET-запрос на сервер для проверки незавершённых звонков
////        const response = await fetch(`/Call/GetUnfinishedCalls?userId=${userId}`, {
////            method: 'GET',
////            headers: {
////                'Content-Type': 'application/json',
////            },
////        });

////        // Обрабатываем ответ
////        if (!response.ok) {
////            throw new Error('Failed to fetch unfinished calls.');
////        }

////        const data = await response.json();

////        // Проверяем, есть ли незавершённые звонки
////        if (data.length > 0) {
////            console.log('Unfinished calls found:', data);
////            alert('You have unfinished calls. Please check them.');
////            const callInterface = document.getElementById('callInterface');
////            callInterface.classList.add('collapsed');
////            callInterface.style.display = 'block';
////            document.getElementById('hangupButton').disabled = false;
////        } else {
////            console.log('No unfinished calls found.');
////        }
////    } catch (error) {
////        console.error('Error checking unfinished calls:', error);
////        alert('An error occurred while checking for unfinished calls.');
////    }
////}






////document.getElementById('toggleCallButton').addEventListener('click', function () {
////    const callInterface = document.getElementById('callInterface');
////    const callContent = document.getElementById('callContent');
////    const toggleButton = document.getElementById('toggleCallButton');

////    if (callInterface.classList.contains('collapsed')) {
////        // Разворачиваем блок
////        callInterface.classList.remove('collapsed');
////        toggleButton.textContent = 'Свернуть';
////        document.getElementById('messengerInterface').style.display = 'none';
////    } else {
////        // Сворачиваем блок
////        callInterface.classList.add('collapsed');
////        toggleButton.textContent = 'Развернуть';
////        document.getElementById('messengerInterface').style.display = 'block';
////    }
////});




////let localStream;
////let peerConnection;
////const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

////// Элементы интерфейса
////const startCallButton = document.getElementById('callButton');
////const endCallButton = document.getElementById('hangupButton');
////const localVideo = document.getElementById('localVideo');
////const remoteVideo = document.getElementById('remoteVideo');
////const statusMessage = document.getElementById('statusMessage');
////const incomingCallModal = document.getElementById('incomingCallModal');
////const callerName = document.getElementById('callerName');
////const acceptCallButton = document.getElementById('acceptCallButton');
////const rejectCallButton = document.getElementById('rejectCallButton');
////const localAudio = document.getElementById('localAudio');
////const remoteAudio = document.getElementById('remoteAudio');

////const endGroupCallButton = document.getElementById('hangupGroupButton');

////const joinCall = document.getElementById('joinCall');
////const callToGroup = document.getElementById('callToGroup');




////async function getStatus(groupId) {
////    try {
////        const response = await fetch(`/Group/GetStatus/${groupId}`);
        
////        // Проверка статуса ответа
////        if (!response.ok) {
////            const errorMessage = await response.text();
////            throw new Error(`Ошибка: ${errorMessage}`);
////        }
        
////        const status = await response.json();
////        return status;
////    } catch (error) {
////        console.error('Ошибка при получении статуса:', error.message);
////        throw error;
////    }
////}

////async function setGroupStatus(groupId, inCall) {
////    try {
////        const response = await fetch('/Group/SetStatus', {
////            method: 'PUT',
////            headers: {
////                'Content-Type': 'application/json',
////            },
////            body: JSON.stringify({
////                groupId: groupId,
////                inCall: inCall
////            }),
////        });

////        if (!response.ok) {
////            const errorMessage = await response.text();
////            throw new Error(`Ошибка: ${errorMessage}`);
////        }

////        const result = await response.json();
////        console.log('Статус успешно обновлен:', result);
////        return result;
////    } catch (error) {
////        console.error('Ошибка при обновлении статуса:', error.message);
////        throw error;
////    }
////}

////async function createCall() {
////    try {
////        // Define the request body based on the call type
////        let requestBody;
////        console.log("Aleee blyaa", currentType);
////        if (currentType === "group") {

////            console.log(selectedGroupId);
////            requestBody = { GroupId: selectedGroupId, UserId: currentUser.id };
////        } else {
////            requestBody = { GroupId: null, UserId: currentUser.id };
////        }

////        // Send the POST request to the backend
////        let response;
////        try {
////            response = await fetch('/Call/CreateCall', {
////                method: 'POST',
////                headers: {
////                'Content-Type': 'application/json',
////                },
////                body: JSON.stringify(requestBody)
////            });
////        } catch (error) {
////            throw new Error('Network error: Unable to connect to the server.');
////        }

////        // Handle the response
////        if (!response.ok) {
////            console.log(response);
////            const errorData = await response.json();
////            throw new Error(errorData.message || 'An error occurred while creating the call.');
////        }

////        const data = await response.json();
////        console.log('Call created successfully:', data);
////        alert('Call created successfully!');
////    } catch (error) {
////        console.error('Error creating call:', error);
////        alert('Error creating call: ' + error.message);
////    }
////}









////// Создаем AudioContext и AnalyserNode
////let audioContext;
////let outgoingAnalyser;
////let incomingAnalysers = []; // Массив для анализаторов всех подключившихся пользователей
////let incomingIndicators = []; // Массив для индикаторов всех подключившихся пользователей



////let isCallActive = false; // Флаг для отслеживания состояния звонка



////// Обработчик нажатия кнопки "Call"
////startCallButton.addEventListener('click', async () => {
    
////    if (selectedType == 'group') 
////    {
////        //setGroupStatus(selectedGroupId, true);
////        createCall().catch((error) => {console.error('Failed to create call:', error.message); });
////        document.getElementById('hangupGroupButton').disabled = false;
////        document.getElementById('hangupButton').style.display = 'none';
////        document.getElementById('hangupButton').disabled = true;
////    }else 
////    {
////        createCall().catch((error) => {console.error('Failed to create call:', error.message); });
////        document.getElementById('hangupGroupButton').disabled = true;
////        document.getElementById('hangupGroupButton').style.display = 'none';
////        document.getElementById('hangupButton').disabled = false;
////        inCallWithId = selectedUserId;
////    }
////    // Инициализация AudioContext и анализатора звонящего
////    if (!audioContext) {
////        audioContext = new (window.AudioContext || window.webkitAudioContext)();
////        outgoingAnalyser = audioContext.createAnalyser();
////        outgoingAnalyser.fftSize = 32;
////    }

////    // Восстанавливаем AudioContext, если он приостановлен
////    if (audioContext.state === 'suspended') {
////        await audioContext.resume();
////    }

////    document.getElementById('callInterface').style.display = 'block';
    
////    document.getElementById('messengerInterface').style.display = 'none';

////    try {
////        try {
////            localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
////            console.log('Local stream tracks:', localStream.getTracks()); // Проверка треков
////            if (localStream.getAudioTracks().length === 0) {
////                console.error('No audio tracks found in local stream.');
////                return;
////            }
////            localVideo.style.display = 'none'; // Скрываем видеоэлемент
////            connectAudioStream(localStream, outgoingAnalyser);
////        } catch (error) {
////            console.error('Ошибка при получении локального медиапотока:', error);
////            statusMessage.textContent = 'Ошибка при получении микрофона.';
////            return;
////        }


////        // Отображение только индикатора звонящего
////        document.getElementById('outgoingAudioIndicator').style.display = 'block';
////        document.getElementById('incomingAudios').style.display = 'none'; // Скрываем индикаторы других пользователей


////        if ( currentType != "group") 
////        {

        

////            // Создание RTCPeerConnection
////            peerConnection = new RTCPeerConnection(configuration);
////            console.log('peerConnection created:', peerConnection);

        

////            localStream.getTracks().forEach(track => {
////                peerConnection.addTrack(track, localStream);
////            });

////            updateIndicators();

////            peerConnection.onicecandidate = event => {
////                if (event.candidate) {
////                    console.log('New ICE candidate:', event.candidate);
////                    const candidateString = JSON.stringify(event.candidate);
////                        connectionCall.invoke("SendIceCandidate", inCallWithId, candidateString)
////                            .catch(err => console.error('Error sending ICE candidate:', err));
                
////                } else {
////                    console.log('All ICE candidates have been sent.');
////                }
////            };

////            // Обработка удаленного потока
////            peerConnection.ontrack = event => {
////                remoteStream = event.streams[0];
////                const userId = inCallWithId; // Идентификатор подключившегося пользователя

////                console.log('Remote stream tracks:', remoteStream.getTracks()); // Проверка треков
////                if (remoteStream.getAudioTracks().length === 0) {
////                    console.error('No audio tracks found in remote stream.');
////                    return;
////                }
////                remoteVideo.style.display = 'none'; // Скрываем видеоэлемент
////                remoteAudio.srcObject = remoteStream;

////                // Создание нового анализатора и индикатора
////                const incomingAnalyser = audioContext.createAnalyser();
////                incomingAnalyser.fftSize = 32;

////                incomingAnalysers.push({ analyser: incomingAnalyser, userId: userId });

////                const indicator = createAudioIndicator(userId);
////                incomingIndicators.push(indicator);

////                // Подключение анализатора к удаленному потоку
////                connectAudioStream(remoteStream, incomingAnalyser);

////                // Отображение индикаторов всех подключившихся пользователей
////                document.getElementById('incomingAudios').style.display = 'block';

////                updateIndicators();
////            };

////            updateIndicators();

////            // Генерация SDP предложения
////            const offer = await peerConnection.createOffer();
////            await peerConnection.setLocalDescription(offer);

////            if (selectedType == 'group') 
////            {
////                sendingOffer = offer.sdp;
////            } else 
////            {
////                // Отправка SDP предложения через SignalR
////                await connectionCall.invoke("SendOffer", inCallWithId, offer.sdp, currentUser);
////                console.log('Sending offer to user:', inCallWithId);
////            }

////        } else 
////        {
////            const peerConnection = new RTCPeerConnection({
////                iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
////            });

////            // Добавление локального потока
////            localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

////            updateIndicators();
////        }

////        statusMessage.textContent = 'Звонок начат. Ожидание ответа...';
////        startCallButton.disabled = true;
////        endCallButton.disabled = false;
////    } catch (error) {
////        console.error('Ошибка при инициализации звонка:', error);
////        statusMessage.textContent = 'Ошибка при инициализации звонка.';
////    }
////});


////// Функция для создания нового индикатора
////function createAudioIndicator(userId) {
////    const indicatorContainer = document.createElement('div');
////    indicatorContainer.id = `incomingAudioIndicator_${userId}`;
////    indicatorContainer.className = 'audio-indicator';
////    indicatorContainer.textContent = userId;
////    document.getElementById('incomingAudios').appendChild(indicatorContainer);
////    return indicatorContainer;
////}


////// Функция для обновления одного индикатора
////function updateAudioIndicator(analyser, indicatorId) {
////    const dataArray = new Uint8Array(analyser.frequencyBinCount);
////    analyser.getByteFrequencyData(dataArray);
////    const volume = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
////    const indicator = document.getElementById(indicatorId);
////    if (indicator) {
////        indicator.style.width = `${volume}%`;
////    }
////}

////function connectAudioStream(stream, analyser) {
////    if (!stream || !stream.getAudioTracks().length) {
////        console.error('No audio tracks in the stream.');
////        return;
////    }
////    const source = audioContext.createMediaStreamSource(stream);
////    source.connect(analyser);
////}


////// Функция для обновления индикаторов
////function updateIndicators() {
////    // Обновление индикатора звонящего
////    updateAudioIndicator(outgoingAnalyser, 'outgoingAudioIndicator');

////    // Обновление индикаторов всех подключившихся пользователей
////    incomingAnalysers.forEach(({ analyser, userId }) => {
////        console.log(userId);
////        updateAudioIndicator(analyser, `incomingAudioIndicator_${userId}`);
////    });

////    requestAnimationFrame(updateIndicators);
////}



////// Обработка получения ответа от пользователя, которому звонили
////connectionCall.on("ReceiveAnswer", async (answerSdp) => {

////    if (!peerConnection) {
////        console.error('peerConnection is not initialized.');
////        return;
////    }

////    try {
////        // Проверяем, что локальное описание (offer) уже установлено
////        if (!peerConnection.localDescription || peerConnection.localDescription.type !== 'offer') {
////            console.error('Локальное описание (offer) не установлено.');
////            return;
////        }

////        // Установка удаленного SDP ответа
////        try {
////            await peerConnection.setRemoteDescription({ type: 'answer', sdp: answerSdp });
////        } catch (error) {
////            console.error('Ошибка при установке удаленного описания:', error);
////            statusMessage.textContent = 'Ошибка при установке соединения.';
////        }

////        console.log('Set remote description:', peerConnection.remoteDescription.sdp); 
////        console.log('Remote description set successfully.');


        

////        peerConnection.onconnectionstatechange = () => {
////            console.log('Connection state:', peerConnection.connectionState);
////            if (peerConnection.connectionState === 'connected') {
////                console.log('Connection established successfully.');
////            }
////        }; 

////        // Обновление статуса звонка
////        statusMessage.textContent = 'Звонок установлен.';
////        startCallButton.disabled = true; // Отключаем кнопку "Call"
////        endCallButton.disabled = false; // Включаем кнопку "End Call"
////    } catch (error) {
////        console.error('Ошибка при установке удаленного описания:', error);
////        statusMessage.textContent = 'Ошибка при установке соединения.';
////    }
////});





////// Обработка входящего звонка
////connectionCall.on("ReceiveOffer", async (senderConnectionId, offer, currentUser) => {
////    peerConnection = new RTCPeerConnection(configuration);
////    inCallWithId = currentUser.id;
////    console.log(inCallWithId);
////    console.log('peerConnection created:', peerConnection);
////    try {
////        // Отображаем модальное окно для входящего звонка
////        incomingCallModal.style.display = 'block';
////        callerName.textContent = currentUser.userName; // Укажите имя или ID звонящего

////        // Обработчик нажатия кнопки "Ответить"
////        acceptCallButton.onclick = async () => {

////            // Инициализация AudioContext и анализатора звонящего
////            if (!audioContext) {
////                audioContext = new (window.AudioContext || window.webkitAudioContext)();
////                outgoingAnalyser = audioContext.createAnalyser();
////                outgoingAnalyser.fftSize = 32;
////            }

////            // Восстанавливаем AudioContext, если он приостановлен
////            if (audioContext.state === 'suspended') {
////                await audioContext.resume();
////            }


////            try {
////                localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
////                console.log('Local stream tracks:', localStream.getTracks()); // Проверка треков
////                if (localStream.getAudioTracks().length === 0) {
////                    console.error('No audio tracks found in local stream.');
////                    return;
////                }
////                localVideo.style.display = 'none'; // Скрываем видеоэлемент
////                connectAudioStream(localStream, outgoingAnalyser);
////            } catch (error) {
////                console.error('Ошибка при получении локального медиапотока:', error);
////                statusMessage.textContent = 'Ошибка при получении микрофона.';
////                return;
////            }


////            incomingCallModal.style.display = 'none'; // Скрываем модальное окно
////            document.getElementById('callInterface').style.display = 'block'; // Показываем интерфейс звонка
////            document.getElementById('hangupButton').disabled = false; // Активируем кнопку завершения звонка
////            document.getElementById('messengerInterface').style.display = 'none';


////            localStream.getTracks().forEach(track => {
////                console.log('Adding track:', track.kind); // Проверка типа трека
////                peerConnection.addTrack(track, localStream);
////            });


////            // Обработка удаленного потока
////            peerConnection.ontrack = event => {
////                remoteStream = event.streams[0];
////                const userId = inCallWithId; // Идентификатор подключившегося пользователя

////                console.log('Remote stream tracks:', remoteStream.getTracks()); // Проверка треков
////                if (remoteStream.getAudioTracks().length === 0) {
////                    console.error('No audio tracks found in remote stream.');
////                    return;
////                }
////                remoteVideo.style.display = 'none'; // Скрываем видеоэлемент
////                remoteAudio.srcObject = remoteStream;

////                // Создание нового анализатора и индикатора
////                const incomingAnalyser = audioContext.createAnalyser();
////                incomingAnalyser.fftSize = 32;
////                incomingAnalysers.push({ analyser: incomingAnalyser, userId: userId });

////                const indicator = createAudioIndicator(userId);
////                incomingIndicators.push(indicator);

////                // Подключение анализатора к удаленному потоку
////                connectAudioStream(remoteStream, incomingAnalyser);

////                // Отображение индикаторов всех подключившихся пользователей
////                document.getElementById('incomingAudios').style.display = 'block';

////                updateIndicators();
////            };

////            updateIndicators();
////            // Установка удаленного SDP предложения
////            await peerConnection.setRemoteDescription({ type: 'offer', sdp: offer });

////            processPendingCandidates();


////            const answer = await peerConnection.createAnswer();
////            await peerConnection.setLocalDescription(answer);


////            // Отправка SDP ответа через SignalR
////            await connectionCall.invoke("SendAnswer", currentUser.id, answer.sdp);
////            console.log('Sending answer to user:', currentUser.id);

////             // Обработка ICE кандидатов
////            peerConnection.onicecandidate = event => {
////                if (event.candidate) {
////                    console.log('New ICE candidate:', event.candidate);
////                    const candidateString = JSON.stringify(event.candidate);
////                    connectionCall.invoke("SendIceCandidate", currentUser.id, candidateString)
////                        .catch(err => console.error('Error sending ICE candidate:', err));
////                } else {
////                    console.log('All ICE candidates have been sent.');
////                }
////            };


////            peerConnection.onconnectionstatechange = () => {
////                console.log('Connection state:', peerConnection.connectionState);
////                if (peerConnection.connectionState === 'connected') {
////                    console.log('Connection established successfully.');
////                } else if (peerConnection.connectionState === 'failed') {
////                    console.error('Connection failed. Check ICE candidates, network, or server settings.');
////                }
////            };


////            statusMessage.textContent = 'Звонок принят.';
////            startCallButton.disabled = true;
////            endCallButton.disabled = false;
////        };

////        // Обработчик нажатия кнопки "Отклонить"
////        rejectCallButton.onclick = () => {
////            incomingCallModal.style.display = 'none'; // Скрываем модальное окно
////            isCallActive = false; // Сбрасываем флаг
////            // Здесь можно добавить код для уведомления звонящего об отклонении
////        };
////    } catch (error) {
////        console.error('Ошибка при обработке предложения:', error);
////        statusMessage.textContent = 'Ошибка при обработке предложения.';
////    }
////});

////const pendingCandidates = [];
////const sendingCandidates = [];
////let sendingOffer = null;
////let peerConnections = {};



////connectionCall.on("ReceiveIceCandidate", async (candidateString) => {
////    const candidate = JSON.parse(candidateString);

////    if (!peerConnection) {
////        console.error('peerConnection is not initialized.');
////        return;
////    }

////    if (peerConnection.remoteDescription) {
////        try {
////            await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
////            console.log('ICE candidate added successfully.');
////        } catch (err) {
////            console.error('Error adding ICE candidate:', err);
////        }
////    } else {
////        console.warn('Remote description is not set yet. Storing candidate.');
////        pendingCandidates.push(candidate);
////    }
////});

////// После установки remote description:
////async function processPendingCandidates() {
////    for (const candidate of pendingCandidates) {
////        try {
////            await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
////            console.log('Pending ICE candidate added successfully.');
////        } catch (err) {
////            console.error('Error adding pending ICE candidate:', err);
////        }
////    }
////    // Очищаем очередь
////    pendingCandidates.length = 0;
////}




////// Функция для завершения звонка (общая для обоих пользователей)
////async function endCall() {
////    // Скрываем интерфейс звонка и возвращаем мессенджер
    


////    document.getElementById('callInterface').style.display = 'none';
////    document.getElementById('messengerInterface').style.display = 'block';
////    incomingCallModal.style.display = 'none';
////    statusMessage.textContent = 'Звонок завершен.';
    
////    // Отключаем/сбрасываем кнопки
////    startCallButton.disabled = false;
////    endCallButton.disabled = true;
////    document.getElementById('hangupButton').disabled = true;

////    // Закрываем RTCPeerConnection
////    if (peerConnection) {
////        peerConnection.close();
////        peerConnection = null;
////    }
    
////    // Останавливаем локальный медиапоток
////    if (localStream) {
////        localStream.getTracks().forEach(track => track.stop());
////        localStream = null;
////    }
    
////    // Очищаем источники видео/аудио
////    localVideo.srcObject = null;
////    remoteVideo.srcObject = null;

////    // Remove the user from the call
////    try {

////        const responseUser = await fetch('/Home/GetUser');
        
////        // Проверка статуса ответа
////        if (!responseUser.ok) {
////            throw new Error(`Network response was not ok: ${response.statusText}`);
////        }
        
////        const user = await responseUser.json();

////        console.log(user);

////        const responseCall = await fetch(`/Call/GetUnfinishedCalls?userId=${user.id}`, {
////            method: 'GET',
////            headers: {
////                'Content-Type': 'application/json',
////            },
////        });
////        const call = await responseCall.json();
////        console.log(call);

////        console.log(call[0].id);
////        console.log(user.id);


////        // Проверка на существование call и user
////        if (!call || !call[0] || !user) {
////            console.error("Call or user is undefined.");
////            throw new Error("Call or user is undefined.");
////        }

////        // Проверка на валидность ID
////        const callId = parseInt(call[0].id);
////        const userId = parseInt(user.id);

////        if (isNaN(callId) || isNaN(userId) || callId <= 0 || userId <= 0) {
////            console.error("Invalid call ID or user ID.");
////            throw new Error("Invalid call ID or user ID.");
////        }

////        // Выполнение запроса
////        const response = await fetch('/Call/RemoveUserFromCall', {
////            method: 'POST',
////            headers: {
////                'Content-Type': 'application/json',
////            },
////            body: JSON.stringify({
////                callId: callId,
////                userId: userId
////            })
////        });

////        if (!response.ok) {
////            throw new Error(`HTTP error! Status: ${response.status}`);
////        }

////        const result = await response.json();
////        console.log('User removed from call:', result);
////    } catch (error) {
////        console.error('Error removing user from call:', error);
////    }
////}

////// Обработчик кнопки завершения звонка (отправляем сигнал и завершаем звонок локально)
////endCallButton.addEventListener('click', async () => {
////    // Отправляем сигнал завершения звонка удалённому пользователю через SignalR
////    try {
////        await connectionCall.invoke("HangUpCall", inCallWithId);
////        console.log('Hangup signal sent to', inCallWithId);
////    } catch (error) {
////        console.error('Error sending hangup signal:', error);
////    }
    
////    // Завершаем звонок локально
////    await endCall();
////});


////endGroupCallButton.addEventListener('click', async () => {
    

////    joinCall.disabled = false;
////    // Завершаем звонок локально
////    await endCall();
////});


////// Обработка получения сигнала завершения звонка от удалённого пользователя
////connectionCall.on("HangUpCall", async () => {
////    console.log('Received hangup signal from remote user.');
////    await endCall();
////});

////// Код для соединения SignalR
////connectionCall.start()
////    .then(() => {
////        console.log("Соединение SignalR установлено.");
////    })
////    .catch(err => {
////        console.error('Ошибка при подключении SignalR:', err);
////    });


////const connection = new signalR.HubConnectionBuilder()
////    .withUrl('/chathub')
////    .withAutomaticReconnect()
////    .build();


////// Обработка входящих сообщений
////connection.on('ReceiveMessage', (senderId, text) => {
////    fetchUser();
////    // Проверяем, отправлено ли сообщение самим собой
////    if (senderId === currentUser.id) {
////        return; // Если сообщение отправлено самим собой, выходим из функции
////    }
////    if (senderId === selectedUserId) {
////        console.log(`Received message from ${senderId}: ${text}`);
////        const now = new Date();
////        const hours = String(now.getHours()).padStart(2, '0');
////        const minutes = String(now.getMinutes()).padStart(2, '0');
////        const formattedTime = `${hours}:${minutes}`;
////        const messageHtml = `
////            <div class="message message-received">
////                 ${text} <sub>${formattedTime}</sub>
////            </div>`;
////        document.getElementById('messageArea').innerHTML += messageHtml;
////        document.getElementById('messageArea').scrollTop = document.getElementById('messageArea').scrollHeight;
////    }
////});


////// Обработка входящих сообщений
////connection.on('ReceiveMessageFromGroup', (groupName, senderName, text) => { 
////    console.log(`Received message from ${senderName}: ${text}`);
////    fetchUser();
////    // Проверяем, отправлено ли сообщение самим собой
////    if (senderName === currentUser.userName) {
////        return; // Если сообщение отправлено самим собой, выходим из функции
////    }
////    console.log(messagesWith.textContent);
////    if (groupName == messagesWith.textContent) {
////        console.log(`Received message from ${senderName}: ${text}`);
////        const now = new Date();
////        const hours = String(now.getHours()).padStart(2, '0');
////        const minutes = String(now.getMinutes()).padStart(2, '0');
////        const formattedTime = `${hours}:${minutes}`;
////        const messageHtml = `
////            <div class="message message-received">
////                 <b>${senderName}</b> <br>
////                 ${text} <sub>${formattedTime}</sub>
////            </div>`;
////        document.getElementById('messageArea').innerHTML += messageHtml;
////        document.getElementById('messageArea').scrollTop = document.getElementById('messageArea').scrollHeight;
////    }    
////});



////// Запуск соединения
////connection.start()
////    .then(() => console.log('SignalR connection established.11111'))
////    .catch(err => console.error('SignalR connection error:', err));

////// Отправка сообщения
////if (sendMessageButton) {
////    sendMessageButton.addEventListener('click', async () => {
////        const messageText = document.getElementById('messageInput').value.trim();

////        if (!messageText) {
////            alert('Please enter a message.');
////            return;
////        }

////        try {
////            const response = await fetch('/Home/GetUser');
////            if (!response.ok) {
////                throw new Error('Network response was not ok');
////            }
////            const user = await response.json();
////            const currentUserId = user.id;
////            const currentUserName = user.userName;

////            const receiverId = selectedUserId; // ID выбранного пользователя
////            const senderId = currentUserId; // Имя текущего пользователя
////            const senderName = currentUserName;

////            console.log(selectedType);

////            if (selectedType == 'user') {

////                // Отправка сообщения через SignalR
////                await connection.invoke("SendMessage", parseInt(receiverId), senderId, messageText)
////                    .catch(err => console.error('Error sending message:', err));

////                sendMessage();
////            } else if (selectedType === 'group') {
////                try {
////                    // Получаем список пользователей в группе
////                    const users = await getUsers(selectedGroupId);

////                    // Отправляем сообщение каждому пользователю в группе
////                    for (const groupUser of users) {
////                        console.log(typeof groupUser.id);
////                        await connection.invoke("SendMessageToGroup", parseInt(groupUser.id), messagesWith.textContent, senderName, messageText)
////                            .catch(err => console.error('Error sending message:', err));
////                    }

////                    // Если нужно вызвать отдельную функцию для отправки сообщения группе
////                    sendMessageToGroup();
////                } catch (error) {
////                    console.error('Ошибка при получении списка пользователей или отправке сообщений:', error);
////                }
////            }
                

////            // Очистка поля ввода
////            document.getElementById('messageInput').value = '';

////            // Отображение отправленного сообщения в чате
////            const now = new Date();
////            const hours = String(now.getHours()).padStart(2, '0');
////            const minutes = String(now.getMinutes()).padStart(2, '0');
////            const formattedTime = `${hours}:${minutes}`;

////            const messageHtml = `
////                <div class="message message-sent">
////                    ${messageText} <sub>${formattedTime}</sub>
////                </div>`;
////            document.getElementById('messageArea').innerHTML += messageHtml;
////            document.getElementById('messageArea').scrollTop = document.getElementById('messageArea').scrollHeight;

////        } catch (error) {
////            console.error('Error:', error);
////            alert('Error sending message. Please try again later.');
////        }
////    });
////}




////async function getUsers(groupId) {
////    try {
////        const response = await fetch(`/Group/GetUsers/${groupId}`, {
////            method: 'GET',
////            headers: {
////                'Content-Type': 'application/json'
////            }
////        });

////        // Проверка на успешный ответ
////        if (!response.ok) {
////            throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
////        }

////        const users = await response.json(); // Парсим JSON-ответ

////        // Выводим список пользователей в консоль или делаем что-то с ним
////        console.log(users);
////        return users; // Возвращаем список пользователей
////    } catch (error) {
////        console.error('Ошибка при получении списка пользователей:', error);
////    }
////}




////// Обработка ввода в поле поиска
////    userGroupSearch.addEventListener('input', function () {
////        const searchTerm = userGroupSearch.value.trim();
////        searchGroupResults.style.display = searchTerm.length > 0 ? 'block' : 'none';

////        if (searchTerm.length > 0) {
////            fetch(`/Home/SearchUsers?term=${encodeURIComponent(searchTerm)}`)
////                .then(response => {
////                    if (!response.ok) {
////                        throw new Error('Network response was not ok');
////                    }
////                    return response.json();
////                })
////                .then(data => {
////                    searchGroupResults.innerHTML = data.length > 0
////                        ? data.map(user => 
////                            `<li><input data-userid="${user.id}" type="checkbox" id="User" name="User" class="userCheckbox"/>
////                                <label for="User">${user.userName}</label>
////                            </li>`).join('')
////                        : '<li>No users found</li>';
////                })
////                .catch(error => console.error('Error:', error));
////        } else {
////            searchGroupResults.innerHTML = '';
////        }
////    });





////    // Обработка нажатия на кнопку "Добавить"
////document.getElementById('addUserButton').addEventListener('click', async function () {
////    const groupId = selectedGroupId;
////    const selectedUsers = Array.from(document.querySelectorAll('.userCheckbox:checked'))
////        .map(checkbox => checkbox.dataset.userid);

////    if (selectedUsers.length === 0) {
////        alert('Пожалуйста, выберите хотя бы одного пользователя.');
////        return;
////    }

////    // Асинхронная функция для отправки одного пользователя
////    const addUserToGroup = async (userId) => {
////        try {

////            const response = await fetch('/Group/AddUserToGroup', {
////                method: 'POST',
////                headers: {
////                    'Content-Type': 'application/json'
////                },
////                body: JSON.stringify({ groupId: parseInt(groupId), userId: parseInt(userId) })
////            });

////            if (!response.ok) {
////                const error = await response.json();
////                throw new Error(error.message || "Ошибка при добавлении пользователя.");
////            }

////            const data = await response.json();
////            console.log(data.message || `Пользователь ${userId} успешно добавлен.`);
////        } catch (error) {
////            console.error(`Ошибка при добавлении пользователя ${userId}:`, error.message);
////        }
////    };

////    // Последовательно отправляем каждого пользователя
////    for (const userId of selectedUsers) {
////        console.log(userId);
////        await addUserToGroup(userId);
////    }

////    // Закрываем модальное окно после завершения всех запросов
////    alert("Все пользователи обработаны.");
////    document.getElementById('addUserModal').style.display = 'none';
////});








////    // Обработка ввода в поле поиска
////    userSearchInput.addEventListener('input', function () {
////        const searchTerm = userSearchInput.value.trim();
////        searchResults.style.display = searchTerm.length > 0 ? 'block' : 'none';

////        if (searchTerm.length > 0) {
////            fetch(`/Home/SearchUsers?term=${encodeURIComponent(searchTerm)}`)
////                .then(response => {
////                    if (!response.ok) {
////                        throw new Error('Network response was not ok');
////                    }
////                    return response.json();
////                })
////                .then(data => {
////                    searchResults.innerHTML = data.length > 0
////                        ? data.map(user => `<li data-userid="${user.id}" class="search-result-item">${user.userName}</li>`).join('')
////                        : '<li>No users found</li>';
////                })
////                .catch(error => console.error('Error:', error));
////        } else {
////            searchResults.innerHTML = '';
////        }
////    });

////    // Обработка клика по результатам поиска
////    searchResults.addEventListener('click', function (event) {
////        if (event.target.classList.contains('search-result-item')) {
////            const userId = parseInt(event.target.dataset.userid);
////            if (!isNaN(userId)) {
////                selectUser(userId, event.target.textContent);
////            } else {
////                console.error("Некорректный формат userId.");
////            }
////        }
////    });

////    // Обработка клика по существующему пользователю
////    document.querySelectorAll('.existing-user').forEach(item => {
////        item.addEventListener('click', function () {
////            addToGroup.style.display = 'none';
////            const userId = parseInt(this.dataset.userid);
////            if (!isNaN(userId)) {
////                selectUser(userId, this.textContent);
////                selectedType = 'user';
////            } else {
////                console.error("Некорректный формат userId.");
////            }
////        });
////    });



////// Обработка клика по существующей группе
////document.querySelectorAll('.existing-group').forEach(item => {
////    item.addEventListener('click', async function () {
////        addToGroup.style.display = 'block';
////        const groupId = parseInt(this.dataset.groupid);
////        if (!isNaN(groupId)) {
////            await checkActiveCallsForGroup(groupId);
////            selectGroup(groupId, this.textContent);
////            selectedType = 'group';
////        } else {
////            console.error("Некорректный формат groupId.");
////        }
////    });
////});



////async function selectUser(userId, userName) {
////    selectedUserId = userId;
////    selectedGroupId = null;
////    messagesWith.textContent = `${userName}`;
////    messageInputArea.style.display = 'flex';

////    currentType = "user";

////    loadMessages(userId);
////    resetSearchResults();

////    // Получаем все элементы управления в чате
////    const chatControls = document.querySelectorAll('.chatControls');

////    try {
////        const response = await fetch('/Home/GetUser');
////        if (!response.ok) {
////            throw new Error('Network response was not ok');
////        }
////        const user = await response.json();
////        const currentUserId = user.id;

////        // Проверяем, совпадает ли выбранный пользователь с текущим пользователем
////        if (userId === currentUserId) {
////            // Если совпадает, показываем только кнопку Close
////            chatControls.forEach(control => {
////                control.style.display = 'flex';
////            });
////            document.getElementById('callButton').style.display = 'none';
////        } else {
////            // Если не совпадает, показываем все кнопки
////            chatControls.forEach(control => {
////                control.style.display = 'flex';
////            });
////            document.getElementById('callButton').style.display = 'block';
////        }
////    } catch (error) {
////        console.error('Error fetching user data:', error);
////    }
////}



////async function selectGroup(groupId, groupName) {
    

////    selectedGroupId = groupId;
////    currentType = "group";
////    selectedUserId = null;


////    const status = await getStatus(groupId);
////    if (status == true) 
////    {
////        callToGroup.style.display = 'flex';
////        joinCall.disabled = false;
////    } else 
////    {
////        callToGroup.style.display = 'none';
////        joinCall.disabled = true;
////    }
////    messagesWith.textContent = `${groupName}`;
////    messageInputArea.style.display = 'flex';
////    loadMessagesFromGroup(groupId);
////    resetSearchResults();

////    // Получаем все элементы управления в чате
////    const chatControls = document.querySelectorAll('.chatControls');

////    // Показываем все элементы управления
////    chatControls.forEach(control => {
////        control.style.display = 'flex';
////    });

////    // Получаем кнопку вызова
////    const callButton = document.getElementById('callButton');

////}

////async function checkActiveCallsForGroup(selectedGroupId) {
////    try {
////        // Проверка на валидность selectedGroupId
////        if (!selectedGroupId || selectedGroupId <= 0) {
////            console.error("Invalid group ID.");
////            return;
////        }

////        // Выполнение запроса к серверу
////        const response = await fetch(`/Call/GetActiveGroupCalls?groupId=${selectedGroupId}`, {
////            method: 'GET',
////            headers: {
////                'Content-Type': 'application/json',
////            }
////        });

////        // Проверка на успешность запроса
////        if (!response.ok) {
////            const errorData = await response.json();
////            console.error("Request failed with status:", response.status, "Error:", errorData);
////            throw new Error(`Request failed with status: ${response.status}`);
////        }

////        // Получение данных о звонках
////        const activeCalls = await response.json();

////        // Проверка наличия активных звонков
////        if (activeCalls && activeCalls.length > 0) {
////            console.log("Active calls found for group:", selectedGroupId);
////            await setGroupStatus(selectedGroupId, true); // Вызов функции для обновления статуса группы
////        } else {
////            console.log("No active calls found for group:", selectedGroupId);
////            await setGroupStatus(selectedGroupId, false); // Вызов функции для обновления статуса группы
////        }
////    } catch (error) {
////        // Обработка ошибок
////        console.error("Error in checkActiveCallsForGroup:", error.message);
////    }
////}




////// Обработка нажатия кнопки Join
////joinCall.addEventListener('click', async () => {
////    // Инициализация AudioContext и анализатора
////    if (!audioContext) {
////        audioContext = new (window.AudioContext || window.webkitAudioContext)();
////        outgoingAnalyser = audioContext.createAnalyser();
////        outgoingAnalyser.fftSize = 32;
////    }

////    // Восстановление AudioContext, если он приостановлен
////    if (audioContext.state === 'suspended') {
////        await audioContext.resume();
////    }

////    // Показать интерфейс звонка и скрыть интерфейс мессенджера
////    document.getElementById('callInterface').style.display = 'block';
////    document.getElementById('messengerInterface').style.display = 'none';
////    document.getElementById('hangupButton').style.display = 'none';
////    document.getElementById('hangupGroupButton').disabled = false;

////    try {
////        // Получение локального медиапотока
////        localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
////        console.log('Local stream tracks:', localStream.getTracks());
////        if (localStream.getAudioTracks().length === 0) {
////            console.error('No audio tracks found in local stream.');
////            return;
////        }
////        localVideo.style.display = 'none'; // Скрыть видеоэлемент
////        connectAudioStream(localStream, outgoingAnalyser);

////        // Получение списка активных участников звонка
////        const activeUsers = await getCallMembers(selectedGroupId);
////        console.log("Active users:", activeUsers);

////        // Создание и отправка offer всем участникам
////        for (const user of activeUsers) {
////            const peerConnection = createPeerConnection(user.id);

////            // Создание и отправка offer
////            const offer = await peerConnection.createOffer();
////            await peerConnection.setLocalDescription(offer);
////            connectionCall.invoke("SendSignal", user.id, currentUser.id, JSON.stringify({ type: "offer", offer: offer }));
////        }

////        joinCall.disabled = true;
////    } catch (error) {
////        console.error('Ошибка при присоединении к звонку:', error);
////        statusMessage.textContent = 'Ошибка при присоединении к звонку.';
////    }
////});



////async function addUserToCall(callId, userId) {
////    try {
////        // Создаем объект с данными для отправки
////        const requestData = {
////            callId: callId,
////            userId: userId
////        };

////        // Выполняем POST-запрос к API
////        const response = await fetch('/api/calls/AddUserToCall', {
////            method: 'POST',
////            headers: {
////                'Content-Type': 'application/json'
////            },
////            body: JSON.stringify(requestData)
////        });

////        // Проверяем, успешен ли ответ
////        if (!response.ok) {
////            throw new Error('Ошибка при добавлении пользователя в звонок: ' + response.statusText);
////        }

////        // Парсим ответ в формате JSON
////        const result = await response.json();

////        // Возвращаем результат
////        return result;
////    } catch (error) {
////        console.error('Ошибка:', error);
////        return { error: error.message }; // Возвращаем объект с ошибкой
////    }
////}


////async function getCallOfGroup(groupId) {
////    try {
////        // Выполняем GET-запрос к API для получения участников звонка
////        const response = await fetch(`/Call/call?groupId=${groupId}`);

////        // Проверяем, успешен ли ответ
////        if (!response.ok) {
////            throw new Error('Ошибка при получении участников звонка: ' + response.statusText);
////        }

////        // Парсим ответ в формате JSON
////        const call = await response.json();

////        // Возвращаем массив пользователей
////        return call;
////    } catch (error) {
////        console.error('Ошибка:', error);
////    }
////}



////async function getCallMembers(groupId) {
////    try {
////        // Выполняем GET-запрос к API для получения участников звонка
////        const response = await fetch(`/Call/members?groupId=${groupId}`);

////        // Проверяем, успешен ли ответ
////        if (!response.ok) {
////            throw new Error('Ошибка при получении участников звонка: ' + response.statusText);
////        }

////        // Парсим ответ в формате JSON
////        const activeUsers = await response.json();
////        console.log(activeUsers);
////        // Возвращаем массив пользователей
////        return activeUsers;
////    } catch (error) {
////        console.error('Ошибка:', error);
////        return []; // Возвращаем пустой массив в случае ошибки
////    }
////}




////// Обработка входящих сигналов
////connectionCall.on("ReceiveGroupSignal", async (connectionId, signal) => {
////    const peerConnection = peerConnections[connectionId];
////    const data = JSON.parse(signal);
////    console.log(data);
////    try {
////        console.log("Sender ", currentUser.id);
////        if (data.type === "offer") {
////            console.log(data.offer);

////            if (!peerConnections[connectionId]) {
////                console.log(`Creating new PeerConnection for connectionId: ${connectionId}`);
////                peerConnections[connectionId] = createPeerConnection(connectionId);
////            }

////            const peerConnection = peerConnections[connectionId];

////            try {
////                await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
////                console.log('Remote description set successfully.');
////            } catch (error) {
////                console.error('Ошибка при установке remoteDescription:', error);
////                return;
////            }

////            try {
////                const answer = await peerConnection.createAnswer();
////                await peerConnection.setLocalDescription(answer);
////                console.log('Answer created and local description set successfully.');
////                connectionCall.invoke("SendSignal", connectionId, currentUser.id, JSON.stringify({ type: "answer", answer: answer }));
////            } catch (error) {
////                console.error('Ошибка при создании или отправке answer:', error);
////            }

////        }    else if (data.type === "answer") {
////            // Установка удалённого описания (answer)
////            await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));

////            // Отправка ICE кандидатов после установки remoteDescription
////            processPendingCandidates(peerConnection);
////        } else if (data.type === "candidate") {
////            // Обработка ICE кандидатов
////            if (peerConnection.remoteDescription) {
////                try {
////                    await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
////                    console.log('ICE candidate added successfully.');
////                } catch (err) {
////                    console.error('Error adding ICE candidate:', err);
////                }
////            } else {
////                console.warn('Remote description is not set yet. Storing candidate.');
////                pendingCandidates.push(data.candidate);
////            }
////        }
////    } catch (error) {
////        console.error('Ошибка:', error);
////        return { error: error.message }; // Возвращаем объект с ошибкой
////    }
////});


////function processSendingCandidates() {
////    for (const candidate of sendingCandidates) {
////        try {
////            connectionCall.invoke("SendSignal", connectionId, currentUser.id, candidate);
////            console.log('Sending ICE candidate successfully.');
////        } catch (err) {
////            console.error('Error sending ICE candidate:', err);
////        }
////    }
////    // Очищаем очередь
////    pendingCandidates.length = 0;
////}



////// Создание RTCPeerConnection
////function createPeerConnection(connectionId) {
////    const peerConnection = new RTCPeerConnection({
////        iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
////    });

////    // Добавление локального потока
////    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

////    // Обработка ICE кандидатов
////    peerConnection.onicecandidate = (event) => {
////        if (event.candidate) {
////            connectionCall.invoke("SendSignal", connectionId, currentUser.id, JSON.stringify({ type: "candidate", candidate: event.candidate }));
////        }
////    };

////    // Обработка удаленного потока
////    peerConnection.ontrack = event => {
////        remoteStream = event.streams[0];
////        const userId = connectionId; // Идентификатор подключившегося пользователя

////        console.log('Remote stream tracks:', remoteStream.getTracks()); // Проверка треков
////        if (remoteStream.getAudioTracks().length === 0) {
////            console.error('No audio tracks found in remote stream.');
////            return;
////        }
////        remoteVideo.style.display = 'none'; // Скрываем видеоэлемент
////        remoteAudio.srcObject = remoteStream;

////        // Создание нового анализатора и индикатора
////        const incomingAnalyser = audioContext.createAnalyser();
////        incomingAnalyser.fftSize = 32;
////        incomingAnalysers.push({ analyser: incomingAnalyser, userId: userId });

////        const indicator = createAudioIndicator(userId);
////        incomingIndicators.push(indicator);

////        // Подключение анализатора к удаленному потоку
////        connectAudioStream(remoteStream, incomingAnalyser);

////        // Отображение индикаторов всех подключившихся пользователей
////        document.getElementById('incomingAudios').style.display = 'block';

////        updateIndicators();
////    };

////    peerConnections[connectionId] = peerConnection;
////    return peerConnection;
////}



////    // Обработка кнопки Close
////    document.getElementById('closeChatButton').addEventListener('click', function() {
////        resetMessageArea();
////    });



////async function getUserName(userId) {
////    try {
////        const response = await fetch(`/Home/GetUserName/${userId}`); // Используем шаблонные строки
////        if (!response.ok) {
////            throw new Error('Network response was not ok');
////        }
////        const user = await response.json();
////        return user.userName; // Возвращаем имя пользователя
////    } catch (error) {
////        console.error('Error fetching user name:', error);
////        return "Unknown User"; // Возвращаем значение по умолчанию в случае ошибки
////    }
////}

////async function loadMessagesFromGroup(groupId) {
////    if (isNaN(groupId)) {
////        console.error("Некорректный формат groupId.");
////        return;
////    }

////    try {
////        const response = await fetch(`/Group/GetMessages/${groupId}`); // Убедитесь, что это правильный путь
////        if (!response.ok) {
////            throw new Error(`HTTP error! Status: ${response.status}`);
////        }
////        const data = await response.json();

////        if (data && data.length > 0) {
////            const sortedMessages = data.sort((a, b) => new Date(a.Timestamp) - new Date(b.Timestamp));

////            // Создаем массив промисов для получения имен пользователей
////            const messagePromises = sortedMessages.map(async (message) => {
////                const userName = await getUserName(message.senderId); // Получаем имя пользователя
////                if (message.isCurrentUserSender) {
////                    return `
////                    <div class="message ${message.isCurrentUserSender ? 'message-sent' : 'message-received'}">
                        
////                        ${message.text} <sub>${message.timestamp}</sub>
////                    </div>`;
////                }
////                return `
////                    <div class="message ${message.isCurrentUserSender ? 'message-sent' : 'message-received'}">
////                        <b>${userName}</b> <br>
////                        ${message.text} <sub>${message.timestamp}</sub>
////                    </div>`;
////            });

////            // Ожидаем завершения всех промисов
////            const messageHtml = (await Promise.all(messagePromises)).join('');
////            messageArea.innerHTML = messageHtml;
////            messageArea.scrollTop = messageArea.scrollHeight;
////        } else {
////            messageArea.innerHTML = '<p>No messages found for this group.</p>';
////        }
////    } catch (error) {
////        console.error('Error fetching messages:', error);
////        if (error.message.includes("Failed to fetch")) {
////            messageArea.innerHTML = '<p>Unable to connect to the server. Please check your connection.</p>';
////        } else {
////            messageArea.innerHTML = '<p>Error loading messages. Please try again later.</p>';
////        }
////    }
////}



////function sendMessageToGroup() {
////    const messageText = messageInput.value.trim();
////    if (!messageText) {
////        alert('Please enter a message.');
////        return;
////    }

////    const groupId = selectedGroupId; // Убедитесь, что selectedGroupId установлен

////    fetch('/Group/SendMessage', {
////        method: 'POST',
////        headers: { 'Content-Type': 'application/json' },
////        body: JSON.stringify({ GroupId: groupId, Text: messageText })
////    })
////    .then(response => {
////        console.log(response);
////        if (!response.ok) {
////            throw new Error('Network response was not ok');
////        }
////        return response.json();
////    })
////    .then(data => {
////        console.log(data);
////        if (!data.success) {
////            alert('Failed to send message.');
////        } else {
////            // Очищаем поле ввода после успешной отправки
////            messageInput.value = '';
////        }
////    })
////    .catch(error => {
////        console.error('Error sending message:', error);
////        alert('Error sending message. Please try again later.');
////    });
////}







////function loadMessages(userId) {
////    if (isNaN(userId)) {
////        console.error("Некорректный формат userId.");
////        return;
////    }

////    fetch(`https://localhost:7224/Home/GetMessages/${userId}`) // Убедитесь, что это правильный путь
////        .then(response => {
////            if (!response.ok) {
////                throw new Error(`HTTP error! Status: ${response.status}`);
////            }
////            return response.json();
////        })
////        .then(data => {
////            if (data && data.length > 0) {
////                const sortedMessages = data.sort((a, b) => new Date(a.Timestamp) - new Date(b.Timestamp));
////                const messageHtml = sortedMessages.map(message => `
////                    <div class="message ${message.isCurrentUserSender ? 'message-sent' : 'message-received'}">
////                         ${message.text}     <sub>${message.timestamp}</sub>
////                    </div>`).join('');
////                messageArea.innerHTML = messageHtml;
////                messageArea.scrollTop = messageArea.scrollHeight;
////            } else {
////                messageArea.innerHTML = '<p>No messages found for this user.</p>';
////            }
////        })
////        .catch(error => {
////            console.error('Error fetching messages:', error);
////            if (error.message.includes("Failed to fetch")) {
////                messageArea.innerHTML = '<p>Unable to connect to the server. Please check your connection.</p>';
////            } else {
////                messageArea.innerHTML = '<p>Error loading messages. Please try again later.</p>';
////            }
////        });
////}


////    // Функция отправки сообщения
////    function sendMessage() {
////        const messageText = messageInput.value.trim();
////        if (!messageText) {
////            alert('Please enter a message.');
////            return;
////        }

////        fetch('/Home/SendMessage', {
////            method: 'POST',
////            headers: { 'Content-Type': 'application/json' },
////            body: JSON.stringify({ ReceiverId: selectedUserId, Text: messageText })
////        })
////        .then(response => {
////            if (!response.ok) {
////                throw new Error('Network response was not ok');
////            }
////            return response.json();
////        })
////        .then(data => {
////            if (!data.success) {
////                alert('Failed to send message.');
////            } 
////        })
////        .catch(error => {
////            console.error('Error sending message:', error);
////            alert('Error sending message. Please try again later.');
////        });
        
////    }

////    // Функция сброса результатов поиска
////    function resetSearchResults() {
////        searchResults.innerHTML = '';
////        searchResults.style.display = 'none';
////        userSearchInput.value = '';
////    }

////    // Инициализация: сброс области сообщений при загрузке страницы
////    resetMessageArea();

////    function resetMessageArea() {
////        //currentType = null;
////        callToGroup.style.display = 'none';
////        messageArea.innerHTML = '<p>Select a user to start chatting.</p>';
////        messageInputArea.style.display = 'none';
////        document.querySelectorAll('.chatControls').forEach(control => {
////            control.style.display = 'none';
////        });
////    }
////});