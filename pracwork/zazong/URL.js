//编码转译

//1 转译除了数字、字母、（ ） 。 ！ ~ * ‘ -  _之外的汉字等，防止乱码 如 + & #
encodeURIComponent(str)
decodeURIComponent(str)