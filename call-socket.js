//import * as $ from 'https://code.jquery.com/jquery-3.6.4.min.js';
//import $ from 'https://code.jquery.com/jquery-3.6.4.min.js';
$(document).ready(function () {
    // Thay đổi địa chỉ WebSocket theo địa chỉ của server của bạn
    const socket = new WebSocket('ws://203.162.69.77:3000/');

    socket.addEventListener('open', function (event) {
        console.log('Connected to WebSocket server');
    });

    socket.addEventListener('message', function (event) {
        var data;
        try {
            data = JSON.parse(event.data);
            $( data ).each(function(index, value) {
                if(data[index].type== 'SIMPLE'){ 
                    const formattedData = `<li>
                    <span>Type: ${data[index].type}</span><br>
                    <span>Timestamp: ${data[index].timestamp}</span><br>
                    <span>Data Event Number: ${data[index].data.eventNum}</span><br>
                    <span>Data Format: ${data[index].data.format}</span><br>
                    <span>Data ID Hex: ${data[index].data.idHex}</span></li>`;  
                    $('#data').append(formattedData);
                }
              });
            // Xử lý dữ liệu ở đây, ví dụ: hiển thị thông tin lên trang HTML
            
            
            console.log('Received data:', data);
        } catch (e) {
            console.log('Received data:', event.data);
        }



    });

    socket.addEventListener('close', function (event) {
        console.log('WebSocket connection closed');
    });

    socket.addEventListener('error', function (event) {
        console.error('WebSocket error:', event);
    });
});
