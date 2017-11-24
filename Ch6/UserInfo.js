(function fillInput () {
  var containerNode = document.getElementById('carInfo'),
  classArr = ['identyNo', 'frameNo', 'engineNo', 'modelName'],
  modelNameArr = ['北京现代BH7180PMY', '宝马BMW7200LD(BMW318i)', '明锐SVW7166GSD', '中华SY7200', '长安SC7164AA5轿车', '比亚迪QCJ7151A5', '东风日产DFL7151MBD2轿车', '别克SGM7252GL', '桑塔纳SVW7180CEi轿车', '梅赛德斯-奔驰WDDHF5EB','速腾FV7166ATG'];
  
  classArr.forEach(function (item) {
    var itemNode = document.querySelectorAll('#carInfo input.' + item)[0],
    itemValue = '';
    switch (item) {
      case 'identyNo':
        itemValue = '130227198102176426';
        break;
      case 'frameNo':
        itemValue = '85236524458' + (Math.floor((Math.random())*1000000) - 1).toString();
        break;
      case 'engineNo':
        itemValue = (Math.floor((Math.random())*100000000) - 1).toString();
        break;
      case 'modelName':
        var index = Math.floor(Math.random()*modelNameArr.length);
        itemValue = modelNameArr[index];
        break;
    }
    if (true) {
      itemNode.value = itemValue;
      try {
        var vehicle = app.getModel('VehicleModel');
        if (item === 'modelName') {
          vehicle.get('carModel').set(item, itemValue);
        } else {
          vehicle.set(item, itemValue);
        }
        
      } catch (error) {console.log(error)}
    }
  });
        var itemNode = document.querySelectorAll('#carInfo input.' + 'nvoice-number-text.certificateNo')[0];
        itemNode.value=(Math.floor((Math.random())*100000000) - 1).toString();

})();