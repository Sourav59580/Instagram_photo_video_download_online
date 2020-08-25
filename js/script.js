
$(document).ready(function () {
    var validURL = "https:\/\/www.instagram.com\/(.+?)/";
    $(".url-from").submit(function (e) {
        e.preventDefault();
        var url = $("#url").val();

        if (url['match'](validURL)) {
            const sourav = document.querySelector('.dummyData');
            fetch(url)
                .then(response => response.text())
                .then(result => {
                    sourav.innerHTML = result;

                    var videoObj = document.querySelector("meta[property='og:video']");
                    if (videoObj) {
                        var videosrc = $('meta[property="og:video"]').attr('content');
                        $.ajax({
                            url: videosrc,
                            xhrFields: {
                                responseType: 'blob'
                            },
                            beforeSend: function () {
                                $("tfoot").removeClass("d-none");
                            },
                            success: function (data) {
                                var blobData = data;
                                var url = window.URL || window.webkitURL;
                                var src = url.createObjectURL(data);
                                $("tfoot").addClass("d-none");
                                $(".instagramcontent").removeClass("d-none");
                                $(".contentDiv").html("");

                                var video = $('<video />', {
                                    id: 'video',
                                    src: src,
                                    type: 'video/webm',
                                    controls: true
                                });
                                $(".contentDiv").append(video);

                                $(".category").html("Video (MP4)");
                                $(".btn-text").html("Download Video");
                                $(".instalink").attr('href', src);
                            }
                        });

                    } else {

                        var imageObj = document.querySelector("meta[property='og:image']");
                        if (imageObj) {
                            var imagesrc = $('meta[property="og:image"]').attr('content');

                            $.ajax({
                                url: imagesrc,
                                xhrFields: {
                                    responseType: 'blob'
                                },
                                beforeSend: function () {
                                    $("tfoot").removeClass("d-none");
                                },
                                success: function (data) {
                                    var blobData = data;
                                    var url = window.URL || window.webkitURL;
                                    var src = url.createObjectURL(data);
                                    $("tfoot").addClass("d-none");
                                    $(".instagramcontent").removeClass("d-none");
                                    $(".contentDiv").html("");
                                    var img = document.createElement("IMG");
                                    img.className = "rounded";
                                    img.style.width = "100%";
                                    img.src = src;
                                    $(".contentDiv").append(img);
                                    $(".category").html("Image (JPEG)");
                                    $(".btn-text").html("Download Image");
                                    $(".instalink").attr('href', src);
                                }
                            });
                        } else {
                            alert('Error extracting Instagram image / video.');
                        }

                    }

                })

        } else {
            alert("Invalid address, use a proper Insagram link");
        }

    })

})