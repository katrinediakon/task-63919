jQuery(document).ready(function(){
PopUpHide();
       var mass = new Array(); // массив всех занятых клеток
       var mass_x = new Array(); // массив клеток с "х"
       var mass_o = new Array(); // массив клеток с "0"
       localStorage.mass_o;
       localStorage.mass;
       localStorage.mass_x;
       localStorage.end;

       var v = 0; // флаг, есть ли победитель (если да, то "1")
       var gemer = '';
       var gemer_two ='';
       console.log(localStorage.end);

       if(localStorage.end != 1)
       {
          mass_o = JSON.parse(localStorage.mass_o);

          for (var i = 0; i < mass_o.length; i++)  {
            jQuery(".cell").eq(mass_o[i]-1).text(localStorage.gemer_two);
          }
          mass_x = JSON.parse(localStorage.mass_x);
          for (var i = 0; i < mass_x.length; i++)  {
            jQuery(".cell").eq(mass_x[i]-1).text(localStorage.gemer);
          }

       } else {
         mass_o = [];
         mass_x = [];
         localStorage.end = '';
         party();
       }


       localStorage.mass_o = JSON.stringify(mass_o);
       localStorage.mass = JSON.stringify(mass);
       localStorage.mass_x = JSON.stringify(mass_x);

       function party() {
        var side = Math.ceil(Math.random() * (2 - 0) + 1);
        if(side == 2) {
          gemer = 'O';
          gemer_two = 'X';
        } else {
          gemer = 'X';
          gemer_two = 'O';
        }
        localStorage.gemer = gemer;
        localStorage.gemer_two = gemer_two;
       }



       jQuery(".cell").on("click", function(){
         localStorage.end = 0;
        console.log(localStorage.mass);
        console.log(localStorage.end);
           var cell_text = jQuery(this).text();
           if(cell_text != "")
               alert("занято");
           else {
               jQuery(this).text(localStorage.gemer);

               var id_cell = jQuery(this).attr('id');

               id_cell = parseInt(id_cell);

               mass.push(id_cell);
               localStorage.mass = JSON.stringify(mass);
               mass_x.push(id_cell);
               localStorage.mass_x = JSON.stringify(mass_x);
               var v = victory(mass_x, "Игрок");


               if(mass_x.length != 0 && mass.length < 8) {
                   computer();
                 }
               if(mass.length == 9 && v != 1) {
                 localStorage.end = 1;
                  PopUpShow3();
                }
           }
       });

       // Проверка на победу
       function victory(metka, user){

           var srt1 = 0; // переменная проверки первой строки
           var srt2 = 0; // переменная проверки второй строки
           var srt3 = 0; // переменная проверки третьей строки

           var st1 = 0; // переменная проверки первого столбца
           var st2 = 0; // переменная проверки второго столбца
           var st3 = 0; // переменная проверки третьего столбца

           var d1 = 0; // переменная проверки первой диагонали
           var d2 = 0; // переменная проверки второй диагонали


           for (var i = 0; i < metka.length; i++){
               switch(metka[i]) {
                   case 1: { srt1++; st1++; d1++; break; }
                   case 2: { srt1++; st2++; break; }
                   case 3: { srt1++; st3++; d2++; break; }
                   case 4: { srt2++; st1++; break; }
                   case 5: { srt2++; st2++; d1++; d2++;  break; }
                   case 6: { srt2++; st3++; break; }
                   case 7: { srt3++; st1++; d2++; break; }
                   case 8: { srt3++; st2++; break; }
                   case 9: { srt3++; st3++; d1++;break; }
               }

               if(srt1 == 3 || srt2 == 3 || srt3 == 3)
               {
                 localStorage.end = 1;
                 if(user == "Компьютер") {
                   PopUpShow2();
                 } else {
                   PopUpShow();
                 }
               }
               if(st1 == 3 || st2 == 3 || st3 == 3)
               {
                 localStorage.end = 1;
                 if(user == "Компьютер") {
                   PopUpShow2();
                 } else {
                   PopUpShow();
                 }
               }
               if(d1 == 3 || d2 == 3)
               {
                 localStorage.end = 1;
                 if(user == "Компьютер") {
                   PopUpShow2();
                 } else {
                   PopUpShow();
                 }
               }
           }

           if(srt1 == 3 || srt2 == 3 || srt3 == 3 || st1 == 3 || st2 == 3 || st3 == 3 || d1 == 3 || d2 == 3) {
              return 1;
             }
       }

       // действия в случае победы


       // Ход Компьютера
       function computer(){
           var number;
           $flag = false;

           while(true) {
               if(mass.length == 9)
               {
                   location.reload();
               }

               number = getRandomInRange(1, 9);

               for (var i = 0; i < mass.length; i++) {
                   if(number == mass[i])
                       $flag = true;
               }

               if($flag == false)
                   break;
               else
               {
                   $flag = false;
                   continue;
               }



           }

           jQuery(".cell").eq(number-1).text(localStorage.gemer_two);

           mass.push(number);
           mass_o.push(number);
           localStorage.mass = JSON.stringify(mass);
           localStorage.mass_o = JSON.stringify(mass_o);
           victory(mass_o, "Компьютер");
       }




       // Функция генерации случайного числа (возвращает число от 1-9)
       function getRandomInRange(min, max) {
           return Math.floor(Math.random() * (max - min + 1)) + min;
       }
   })
   function PopUpShow(){
          $("#popup1").show();
      }
    function PopUpShow2(){
          $("#popup2").show();
      }
    function PopUpShow3(){
          $("#popup3").show();
      }
      //Функция скрытия PopUp
      function PopUpHide(){
          $("#popup1").hide();
          $("#popup2").hide();
          $("#popup3").hide();
      }
