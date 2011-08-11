$("#channels").live('pagecreate',function(event){
    $.getJSON('http://mediahub.unl.edu/channels/?format=json&limit=100', function(data) {
        var channels = [];
        $.each(data, function(key, value) {
            channels.push('<li class="channel"><a href="channel.html" data-url="'+value.link+'"><img src="'+value.image+'" alt="Channel Image for '+value.title+'" />'+value.title+'</a></li>');
        });
  
        $('<ul/>', 
            {
                'data-role' : 'listview',
                html : channels.join(''),
                'id' : 'channelList'
            }
        ).appendTo("#channels .ui-content");
        $("#channelList").listview();
    });
});

$('.channel a').live('click', function(){
    channelURL = $(this).attr('data-url');
});

$('#channel').live('pagecreate',function(event){
    $.getJSON(channelURL+'?format=json&limit=10', function(data) {
        $('#channel h3').text(data.channel['title']);
        $('#channel p').text(data.channel['description']);
        $('<img />',
            {
                'src' : data.channel['image'],
                'alt' : 'Channel image for ' + data.channel['title'],
                'width' : '50',
                'height' : '50'
            }
        ).prependTo('#channel p');
        var medias = [];
        $.each(data.media, function(key, value){
            medias.push('<li class="media"><a href="media.html" data-url="'+value.link+'"><img src="'+value.image+'" alt="Media Image for '+value.title+'" />'+value.title+'</a></li>');
        });
        $('<ul/>', 
            {
                'data-role' : 'listview',
                html : medias.join(''),
                'id' : 'mediaList'+data.channel['id']
            }
        ).appendTo("#channel .ui-content");
        $('#mediaList'+data.channel['id']).listview();
    });
});

$('.media a').live('click', function(){
    mediaURL = $(this).attr('data-url');
});

$('#media').live('pagecreate',function(event){
    $.getJSON(mediaURL+'?format=json&limit=10', function(data) {
        var contenttype = data['type'];
        var type = contenttype.split('/',1);
        if (type == 'audio') {
            $('<audio />',
                {
                    'src' : data['url'],
                    'controls' : 'controls'
                }
            ).appendTo('.mediaBlock');
        } else {
            $('<video />',
                {
                    'src' : data['url'],
                    'controls' : 'controls'
                }
            ).appendTo('.mediaBlock');
        }
        $('.mediaDetails h3').text(data['title']);
        $('.mediaDetails p').text(data['description']);
        $('.mediaDetails time').text(data['pubDate']);
    });
});