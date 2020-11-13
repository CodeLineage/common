!function () {
    window.common_math = {
        // 两个数相除保留指定位数精度
        // @param left 被除数
        // @param right 除数
        // @param scale 进度
        bcdiv: function(left, right, scale){
            var _this = this;
            if(right==0){
                return 0;
            }
            var rs = left/right;
            if(rs>0.01){
                return (Math.floor(rs * 100) / 100).toFixed(scale);
            }else{
                return 0;
            }
        },
        // 格式化number
        format_number: function(num){
            var _this = this;
            if (num==0) {
                return 0;
            }
            if(num>=100000000){
                return _this.bcdiv(num, 100000000)+'亿';
            }
            if(num>=1000000){
                var temp = Math.floor(num/10000);
                return temp+'万';
            }
            if(num>999){
                return _this.numberFormat(num, 3, ',');
            }
            return num;
        },
        // 格式化数字
        // @param num 数字
        // @param precision 保留的小数
        // @param separator 分割符
        // @parea is_float 是否保留小数
        number_format:function(num, precision, separator, is_float) {
            var parts;
            // 判断是否为数字
            if (!isNaN(parseFloat(num)) && isFinite(num)) {
                // 把类似 .5, 5. 之类的数据转化成0.5, 5, 为数据精度处理做准, 至于为什么
                // 不在判断中直接写 if (!isNaN(num = parseFloat(num)) && isFinite(num))
                // 是因为parseFloat有一个奇怪的精度问题, 比如 parseFloat(12312312.1234567119)
                // 的值变成了 12312312.123456713
                num = Number(num);
                // 处理小数点位数
                num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString();
                // 分离数字的小数部分和整数部分
                parts = num.split('.');
                // 整数部分加[separator]分隔, 借用一个著名的正则表达式
                parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));
                if(is_float){
                    return parts.join();
                }else{
                    return parts[0];
                }
            }
            return 0;
        }
    };
}();
