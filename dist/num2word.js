var th = ['', ' thousand', ' million', ' billion', ' trillion', ' quadrillion', ' quintillion'];
var dg = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
var tn = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
var tw = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

var word2 = ['',' ဆယ့် ', ' ရာ့ ', ' ထောင့် ', ' သောင်း ', ' သိန်း ', ' သန်း ', ' ကုဋေ '];
var digit = ['သုည', 'တစ်', 'နှစ်', 'သုံး', 'လေး', 'ငါး', 'ခြောက်', 'ခုနှစ်', 'ရှစ်', 'ကိုး' ];
var word1 = ['','ဆယ်', 'ရာ', 'ထောင်', 'သောင်း', 'သိန်း', 'သန်း', 'ကုဋေ']

const app = {};

app.english = (s)=> {
    s = s.toString();
    s = s.replace(/[\, ]/g, '');
    if (s != parseFloat(s)) return 'not a number';
    var x = s.indexOf('.');
    if (x == -1) x = s.length;
    if (x > 15) return 'too big';
    var n = s.split('');
    var str = '';
    var sk = 0;
    for (var i = 0; i < x; i++) {
        if ((x - i) % 3 == 2) {
            if (n[i] == '1') {
                str += tn[Number(n[i + 1])] + ' ';
                i++;
                sk = 1;
            } else if (n[i] != 0) {
                str += tw[n[i] - 2] + ' ';
                sk = 1;
            }
        } else if (n[i] != 0) {
            str += dg[n[i]] + ' ';
            if ((x - i) % 3 == 0) str += 'hundred ';
            sk = 1;
        }
        if ((x - i) % 3 == 1) {
            if (sk) str += th[(x - i - 1) / 3] + ' ';
            sk = 0;
        }
    }
    if (x != s.length) {
        var y = s.length;
        str += 'point ';
        for (var i = x + 1; i < y; i++) str += dg[n[i]] + ' ';
    }
    return str.replace(/\s+/g, ' ');
}

app.burmese = (s)=> {
    var s = s * 1;
    s = s.toString();
    s = s.replace(/[\, ]/g, '');
    if (s != parseFloat(s)) return 'not a number';
    var x = s.indexOf('.');
    if (x == -1) x = s.length;
    if (x > 14) return 'too big';
    var n = s.split('');
    if(n[0] == '0') return  digit[0]
    var str = '';
    if(n.length <=8 ){
      for (var i = 0; i < x; i++) {
          if (n[i] != 0) {
              if( (x-i) <= 8){
                str += digit[n[i]] ;
                var val = true;
                for(var z= i+1 ; z < x ; z++){
                  if(n[z]!=0) val = false;
                }
                if(val == true){
                    str += word1[ (x - i)-1 ] ;
                }
                else{
                    str += word2[ (x - i)-1 ] ;
                } 
              }
          }
      }
    }
    else{
        var a = n.length - 7;
        for(var start = 0; start < a ; start++){
            if(n[start]!= 0){
            str += digit[n[start]] + ' ';
            var val = true;
            for(var z= start+1 ; z < x ; z++){
              if(n[z]!=0) val = false;
            }
            if(val == true){
                 str += word1[ (a - start)-1 ] ;
            }
            else{
                str += word2[ (a - start)-1 ] ;
            }
          } 
        }
        str += word2[7];
    }
    if (x != s.length) {
        var y = s.length;
        str += ' ဒဿမ ';
        for (var i = x + 1; i < y; i++) str += digit[n[i]] + ' ';
    }
   return str.replace(/\s+/g, ' ');
    
}

module.exports = app
