function validarCedula(num){
 num=num.replace(/-/g,'');
 if(!/^[0-9]{11}$/.test(num)) return false;
 let sum=0,alt=false;
 for(let i=num.length-1;i>=0;i--){
   let n=parseInt(num[i]);
   if(alt){n*=2;if(n>9)n-=9;}
   sum+=n;alt=!alt;
 }
 return sum%10===0;
}
