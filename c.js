function myFunction() {
        var y = document.getElementById("data").value;

a="abcdefghijklmnopqrstuvwxyz";
b="йцфщзлждюбичяњљжæøñпьџoћвच";
c=new Array();

for
(i=0; i<26; i++){ c[a.charAt(i)]=b.charAt(i); c[a.charAt(i).toUpperCase()]=b.charAt(i).toUpperCase();} a="";

 for
(i=0;i<data.value.length;i++){b=data.value.charAt(i);
a+=(b>='A' && b<='Z' || b>='a' && b<='z' ? c[b] : b);}
                document.getElementById("a").innerHTML = (a); }




var addEvent = (document.addEventListener) ? 
    function (abc,efg,cb) {abc.addEventListener(efg,cb,false);} : 
function (abc,efg,cb) {abc.attachEvent("on"+efg, function(e){cb.call(abc, e);});};

addEvent(window, "load", function init() {
    var formField = document.getElementById("input_form");
    var inputs = formField.getElementsByTagName("input");
    addEvent(formField, "submit", function (evt) {
        (evt.preventDefault) ? evt.preventDefault() : evt.returnValue=false;
        var values = DomController.getValues(inputs);
        if (!values.flg) {DomController.setResult("( N/A )"); return false;}
        var isEncrypt = DomController.checkRadio(inputs);
        var ipLength = values.ip.length;
        var keyLength = values.key.length;
        while (ipLength > keyLength) {
            values.key += values.key;
            keyLength = values.key.length;
        }
        for (var s=0, _1=_2=_3=result=""; s<ipLength; s++) {
            _1 = VigenereAlgorithm.assign(values.ip.charAt(s));
            _2 = VigenereAlgorithm.assign(values.key11.charAt(s));
            _3 = VigenereAlgorithm[isEncrypt](_1, _2);

            result += VigenereAlgorithm.assign(_3);
        }
        if (result == -1) {DomController.setResult("Error Occur"); return false;}
        DomController.setResult(result);
    });
});

var DomController = {
    getValues : function (inputs) {
        var values = {};
        values.flg = true;
        for (var i=0, l=inputs.length; i<l; i++) {
            switch (inputs[i].id) {
                case "ip" : values.ip = inputs[i].value.toLowerCase(); break;
                case "key11": values.key= inputs[i].value.toLowerCase(); break;
            }
        }
        for (target in values) {
            if (values[target] !== values.flg) {
                if (values[target].match(/[^A-Z]/i) || values[target] == "") {
                    values.flg = false;
                }
            }
        }
        return values;
    },
    checkRadio : function (inputs) {
        for (var i=0, l=inputs.length; i<l; i++) {
            if (inputs[i].type === "radio" && inputs[i].checked) {
                return inputs[i].value;
            }
        }
    },
    setResult : function (str) {
        document.getElementById("resultvig").value = str;
    }
}

var VigenereAlgorithm = {
    encrypt : function (source, key){
        return (source + key) % 26;
    },
    // decrypt : function (cipher, key){
    //     return (cipher - key + 26) % 26;
    // },
    assign : function (value) {
        var abc = "abcdefghijklmnopqrstuvwxyz";
        return (isFinite(value)) ? abc.charAt(+value) : abc.indexOf(value);
    }
}








var encryptBtn = $("#encrypt");

function isUpperCase(letter){
  var l = letter.charCodeAt();
  if(l >= 65 && l <= 90){
    return true;
  }else{
    return false;
  }
};

function isLowerCase(letter){
  var l = letter.charCodeAt();
  if(l >= 97 && l <= 122){
    return true;
  }else{
    return false;
  }
};

var encrypt = function(plainMsg, key){
  var cypher = "";
  for(var i = 0, j = 0; i < plainMsg.length; i++){
    var currentLetter = plainMsg[i];

    if(isUpperCase(currentLetter)){
      var upperLetter = ((currentLetter.charCodeAt() - 65) + (key[j%key.length].toUpperCase().charCodeAt() - 65)) % 26;
      cypher += String.fromCharCode(upperLetter+65);
      j++;
    }else if(isLowerCase(currentLetter)){
      var lowerLetter = ((currentLetter.charCodeAt() - 97) + (key[j%key.length].toLowerCase().charCodeAt() - 97)) % 26;
      cypher += String.fromCharCode(lowerLetter+97);
      j++;
    }else{
      cypher += currentLetter;
    }
  }
  return cypher;
};

$(document).ready(function(){

  encryptBtn.on("click", function(){
    var plainMsg = $("#userText");
    var keyword = $("#keyword");

    if(plainMsg.val() == "" || keyword.val() == "" ){
      alert("Please type both secret message and keyword!");
    }else{
      plainMsg.val(encrypt(plainMsg.val(), keyword.val()));
    }
  });

});
