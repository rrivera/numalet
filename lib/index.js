module.exports = function(opt){
    opt = {
        unidad : opt && typeof opt.unidad !== 'undefined' ? opt.unidad : 'MXN',
        mayus : (opt && (opt.mayus === false))?opt.mayus : true,
        decimalesSiempre : opt && typeof opt.decimalesSiempre !== 'undefined' ? opt.decimalesSiempre : false
    };
    return function(n){

        function unidades(n){
            switch (n){
                case 1: return "un";
                case 2: return "dos";
                case 3: return "tres";
                case 4: return "cuatro";
                case 5: return "cinco";
                case 6: return "seis";
                case 7: return "siete";
                case 8: return "ocho";
                case 9: return "nueve";
                default: return "";
            }
        }

        function decenas(n){
            var d = Math.floor(n/10);
            var u = n - (d*10);
            switch (d){
                case 1:
                    switch (u){
                        case 0: return "diez";
                        case 1: return "once";
                        case 2: return "doce";
                        case 3: return "trece";
                        case 4: return "catorce";
                        case 5: return "quince";
                        default: return "dieci"+unidades(u);
                    }
                    break;
                case 2:
                    if(u === 0){
                        return "veinte";
                    }
                    return "veinti"+unidades(u);
                    break;
                case 3: return "treinta"+((u>0)?" y "+unidades(u):"");
                case 4: return "cuarenta"+((u>0)?" y "+unidades(u):"");
                case 5: return "cincuenta"+((u>0)?" y "+unidades(u):"");
                case 6: return "sesenta"+((u>0)?" y "+unidades(u):"");
                case 7: return "setenta"+((u>0)?" y "+unidades(u):"");
                case 8: return "ochenta"+((u>0)?" y "+unidades(u):"");
                case 9: return "noventa"+((u>0)?" y "+unidades(u):"");
                case 0: return unidades(u);


            }
        }
        function centenas(n){
            var c = Math.floor(n/100);
            var d = decenas(n - (c*100));
            switch(c)
            {
                case 1:
                    if (d != "")
                        return "ciento " + d;
                    return "cien";
                case 2: return "doscientos " + d;
                case 3: return "trescientos " + d;
                case 4: return "cuatrocientos " + d;
                case 5: return "quinientos " + d;
                case 6: return "seiscientos " + d;
                case 7: return "setecientos " + d;
                case 8: return "ochocientos " + d;
                case 9: return "novecientos " + d;
                default: return d;
            }

        }

        function miles(n){
            var m = Math.floor(n/1000);
            var c = centenas(n - (m*1000));
            var u = centenas(m);
            if(u == "un"){
                return "mil "+c;
            }else if(u != ""){
                return u + " mil "+c;
            }else{
                return c;
            }
        }

        function millones(n){
            var mm, m, u;


            mm = Math.floor(n/1000000);
            m = handle(mm);
            u = handle(n - (mm*1000000));

            if(m == "un"){
                return "un millon "+u;
            }else if(m != ""){
                return m + " millones "+u;
            }else {
                return miles(m);
            }
        }

        function handle(n) {
            if(n <= 10){
                return decenas(n);
            }else if(n <= 100){
                return centenas(n);
            }else if(n < 1000000){
                return miles(n)
            } else {
                return millones(n);
            }
        }


        function init(n){
            n = Number(n);
            if(n == "NaN"){
                return false;
            }
            var entero = Math.floor(n);
            var decimal = 0;
            var string = n+'';
            if(string.indexOf('.') > -1){
                decimal = string.split('.')[1];
                decimal = decimal.charAt(0) + (decimal.charAt(1) || '0');
            }
            else if (opt.decimalesSiempre) {
                decimal = '00';
            }
            if (n === 0) {
                return "cero";
            }
            else{
                return handle(entero)+((decimal)?" "+decimal+"/100":"");
            }
        }

        var texto = init(n);
        if(opt){
            if(opt.mayus){
                texto = texto.toUpperCase();
            }
            if(opt.unidad){
                texto = texto + " "+opt.unidad;
            }
        }
        return texto.replace(/ +/g, " ").trim();
    };
};
