/**
 * サムネイルなど、縦長か横長か判断してトリミングする
 * 依存: jquery
 */

export default function imageTrimming($class_name) {
    $(window).on('load resize', function(){
            trimming($class_name);
    })
    function trimming ($photoBox) {
        jQuery($photoBox).each(function(){
            var box = jQuery(this);
            var i = jQuery('img',this);
            var box_w =$(box).width();
            var box_h =$(box).height();
            var i_w =$(i).width();
            var i_h =$(i).height();
            var i_par =i_w / i_h; //画像の縦横比
            var box_par =box_w / box_h;
            if (i_par > box_par) { //画像が枠より横長の場合高さ100%で幅左右を切る
                $(i).css({
                    "width": "auto",
                    "height":"100%"
                });
            }else{
                $(i).css({//画像が枠より縦長または同じの場合幅100%にして高さの上下を切る
                    "width": "100%",
                    "height":"auto"
                });
            }
        });
    }
}
