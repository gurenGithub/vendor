$(function(){
    
    function renderUploadItem(fileName, url, id) {
        var $li = $('<li class="upload-item"></li>');
        var $hidden = $('<input type="hidden" />');
        $li.append($hidden);
        var $a = $('<a ></a>');
        $a.html(fileName);
        $a.attr('href', url);
        $li.append($a);
        var $close = $('<span class="upload-remove">x</span>');
        $close.attr('data-id', id);
        $li.append($close);
        $('.upload-list').append($li);
    }
    $('.upload-list').delegate('.upload-remove', 'click', function (event) {

        var $me = $(this);
        var $item = $me.closest('.upload-item');
        var attachmentId = $(this).data('id');
        var self = this;
        $(self).closest('li').remove();

        event.stopPropagation();
    });
    //upload files
    var files = [];
    var fileHtml = '<ul></ul>';
    var $upload = $(".btn-upload");
    $.each($upload, function (index, cur) {
        

        
        var orderId = 0;
        var exrentisons = $(this).attr("extensions") || "jpg,jpeg,gif,png,zip,rar,7z,doc,docx,pdf,xls,xlsx";
        var url = $(this).attr("extensions") || '/WebApi/UploadFileForOrder?orderId=' + orderId;

        var uploadFile = HaierJS.plupload({
            url: url,
            browse_button: cur,
            autoUpload: true,
            filters: {
                max_file_size: '5mb',
                mime_types: [
                    {
                        title: 'attachment files',
                        extensions: exrentisons
                    }
                ]
            },
            init: {
                FileUploaded: function (up, file, respone, json) {
                    if (json != null && json.error == 0) {
                        files.push({
                            FilePath: json.url
                        });
                        fileHtml += '<li>' + file.name + '</li>';
                        renderUploadItem(file.name, json.url, json.attachmentId);

                    }
                },
                UploadComplete: function () {
                    var $attach = $(cur).next(".attachement").find(".view-attachments");
                    $attach.data("attachcount", "1");
                    fileHtml += '</ul><div>Upload Success</div>';
                    H.alert(fileHtml);
                    fileHtml = '';
                },
                Error: function (up, err) {
                    H.alert('Upload Files Error : ' + err.message);
                }
            }


        });
    });
});
