(function(global){
  //推荐专题
  var tuijian_1_img = $('#tuijian_1_img');
  var tuijian_1_url = $('#tuijian_1_url');
  var tuijian_1_title = $('#tuijian_1_title');

  var tuijian_2_img = $('#tuijian_2_img');
  var tuijian_2_url = $('#tuijian_2_url');
  var tuijian_2_title = $('#tuijian_2_title');

  //热门推荐
  var hot_1_img = $('#hot_1_img');
  var hot_1_url = $('#hot_1_url');
  var hot_1_title = $('#hot_1_title');

  var hot_2_img = $('#hot_2_img');
  var hot_2_url = $('#hot_2_url');
  var hot_2_title = $('#hot_2_title');

  var hot_3_img = $('#hot_3_img');
  var hot_3_url = $('#hot_3_url');
  var hot_3_title = $('#hot_3_title');

  var hot_4_img = $('#hot_4_img');
  var hot_4_url = $('#hot_4_url');
  var hot_4_title = $('#hot_4_title');

  var hot_5_img = $('#hot_5_img');
  var hot_5_url = $('#hot_5_url');
  var hot_5_title = $('#hot_5_title');

  var hot_6_img = $('#hot_6_img');
  var hot_6_url = $('#hot_6_url');
  var hot_6_title = $('#hot_6_title');

  var hot_7_img = $('#hot_7_img');
  var hot_7_url = $('#hot_7_url');
  var hot_7_title = $('#hot_7_title');

  var hot_8_img = $('#hot_8_img');
  var hot_8_url = $('#hot_8_url');
  var hot_8_title = $('#hot_8_title');

  //分类管理
  var category_1_text = $('#category_1_text');

  var category_2_text = $('#category_2_text');

  var category_3_text = $('#category_3_text');

  var category_4_text = $('#category_4_text');

  //文章欣赏
  var page_1_img = $('#page_1_img');
  var page_1_url = $('#page_1_url');
  var page_1_title = $('#page_1_title');

  var page_2_img = $('#page_2_img');
  var page_2_url = $('#page_2_url');
  var page_2_title = $('#page_2_title');

  var page_3_img = $('#page_3_img');
  var page_3_url = $('#page_3_url');
  var page_3_title = $('#page_3_title');

  var page_4_img = $('#page_4_img');
  var page_4_url = $('#page_4_url');
  var page_4_title = $('#page_4_title');

  var page_5_img = $('#page_5_img');
  var page_5_url = $('#page_5_url');
  var page_5_title = $('#page_5_title');

  var page_6_img = $('#page_6_img');
  var page_6_url = $('#page_6_url');
  var page_6_title = $('#page_6_title');

  var page_7_img = $('#page_7_img');
  var page_7_url = $('#page_7_url');
  var page_7_title = $('#page_7_title');

  var page_8_img = $('#page_8_img');
  var page_8_url = $('#page_8_url');
  var page_8_title = $('#page_8_title');

  //获取
  $.get('/data/config.json', function(data){
    tuijian_1_img.val(data.recommendTopic[0].img);
    tuijian_1_url.val(data.recommendTopic[0].url);
    tuijian_1_title.val(data.recommendTopic[0].title);

    tuijian_2_img.val(data.recommendTopic[1].img);
    tuijian_2_url.val(data.recommendTopic[1].url);
    tuijian_2_title.val(data.recommendTopic[1].title);
    //-------------------------------------------
    hot_1_img.val(data.hotTopic[0].img);
    hot_1_title.val(data.hotTopic[0].title);
    hot_1_url.val(data.hotTopic[0].url);

    hot_2_img.val(data.hotTopic[1].img);
    hot_2_title.val(data.hotTopic[1].title);
    hot_2_url.val(data.hotTopic[1].url);

    hot_3_img.val(data.hotTopic[2].img);
    hot_3_title.val(data.hotTopic[2].title);
    hot_3_url.val(data.hotTopic[2].url);

    hot_4_img.val(data.hotTopic[3].img);
    hot_4_title.val(data.hotTopic[3].title);
    hot_4_url.val(data.hotTopic[3].url);

    hot_5_img.val(data.hotTopic[4].img);
    hot_5_title.val(data.hotTopic[4].title);
    hot_5_url.val(data.hotTopic[4].url);

    hot_6_img.val(data.hotTopic[5].img);
    hot_6_title.val(data.hotTopic[5].title);
    hot_6_url.val(data.hotTopic[5].url);

    hot_7_img.val(data.hotTopic[6].img);
    hot_7_title.val(data.hotTopic[6].title);
    hot_7_url.val(data.hotTopic[6].url);

    hot_8_img.val(data.hotTopic[7].img);
    hot_8_title.val(data.hotTopic[7].title);
    hot_8_url.val(data.hotTopic[7].url);
    //-------------------------------------------
    category_1_text.val(data.category[0].text);
    category_2_text.val(data.category[1].text);
    category_3_text.val(data.category[2].text);
    category_4_text.val(data.category[3].text);
    //-------------------------------------------
    page_1_img.val(data.other[0].img);
    page_1_title.val(data.other[0].title);
    page_1_url.val(data.other[0].url);

    page_2_img.val(data.other[1].img);
    page_2_title.val(data.other[1].title);
    page_2_url.val(data.other[1].url);

    page_3_img.val(data.other[2].img);
    page_3_title.val(data.other[2].title);
    page_3_url.val(data.other[2].url);

    page_4_img.val(data.other[3].img);
    page_4_title.val(data.other[3].title);
    page_4_url.val(data.other[3].url);

    page_5_img.val(data.other[4].img);
    page_5_title.val(data.other[4].title);
    page_5_url.val(data.other[4].url);

    page_6_img.val(data.other[5].img);
    page_6_title.val(data.other[5].title);
    page_6_url.val(data.other[5].url);

    page_7_img.val(data.other[6].img);
    page_7_title.val(data.other[6].title);
    page_7_url.val(data.other[6].url);

    page_8_img.val(data.other[7].img);
    page_8_title.val(data.other[7].title);
    page_8_url.val(data.other[7].url);
  });
  //提交
  $('#submit').on('click', function(){
    var obj = {
      recommendTopic: [
        {
          img: tuijian_1_img.val(),
          url: tuijian_1_url.val(),
          title: tuijian_1_title.val()
        },
        {
          img: tuijian_2_img.val(),
          url: tuijian_2_url.val(),
          title: tuijian_2_title.val()
        }
      ],
      /*热门主题8个*/
      hotTopic: [
        {
          img: hot_1_img.val(),
          title: hot_1_title.val(),
          url: hot_1_url.val()
        },
        {
          img: hot_2_img.val(),
          title: hot_2_title.val(),
          url: hot_2_url.val()
        },
        {
          img: hot_3_img.val(),
          title: hot_3_title.val(),
          url: hot_3_url.val()
        },
        {
          img: hot_4_img.val(),
          title: hot_4_title.val(),
          url: hot_4_url.val()
        },
        {
          img: hot_5_img.val(),
          title: hot_5_title.val(),
          url: hot_5_url.val()
        },
        {
          img: hot_6_img.val(),
          title: hot_6_title.val(),
          url: hot_6_url.val()
        },
        {
          img: hot_7_img.val(),
          title: hot_7_title.val(),
          url: hot_7_url.val()
        },
        {
          img: hot_8_img.val(),
          title: hot_8_title.val(),
          url: hot_8_url.val()
        }
      ],
      /*分类*/
      category:[
        {
          text: category_1_text.val()
        },
        {
          text: category_2_text.val()
        },
        {
          text: category_3_text.val()
        },
        {
          text: category_4_text.val()
        }
      ],
      /*其他推荐*/
      other:[
        {
          img: page_1_img.val(),
          title: page_1_title.val(),
          url: page_1_url.val()
        },
        {
          img: page_2_img.val(),
          title: page_2_title.val(),
          url: page_2_url.val()
        },
        {
          img: page_3_img.val(),
          title: page_3_title.val(),
          url: page_3_url.val()
        },
        {
          img: page_4_img.val(),
          title: page_4_title.val(),
          url: page_4_url.val()
        },
        {
          img: page_5_img.val(),
          title: page_5_title.val(),
          url: page_5_url.val()
        },
        {
          img: page_6_img.val(),
          title: page_6_title.val(),
          url: page_6_url.val()
        },
        {
          img: page_7_img.val(),
          title: page_7_title.val(),
          url: page_7_url.val()
        },
        {
          img: page_8_img.val(),
          title: page_8_title.val(),
          url: page_8_url.val()
        }
      ]
    };

    $.ajax({
      type: 'POST',
      url: '/data/write_config',
      data: {data: JSON.stringify(obj)},
      success: function(data){
        if(data.status){
          alert('添加数据成功');
          window.location.reload();
        }else{
          alert('添加失败');
        }
      },
      error: function(){
        alert('添加失败');
      },
      dataType: 'json'
    });

  });


})(window);