var nameEl1 = document.getElementById('picker6');

var first1 = []; /* 年 */
var second1 = []; /* 月 */
var third1 = []; /* 日 */

var selectedIndex = [0, 0, 0]; /* 默认选中的地区 */

var checked = [0, 0, 0]; /* 已选选项 */

function creatList(obj, list){
  obj.forEach(function(item, index, arr){
  var temp = new Object();
  temp.text = item.name;
  temp.value = index;
  list.push(temp);
  })
}

creatList(time, first1);

if (time[selectedIndex[0]].hasOwnProperty('sub')) {
  creatList(time[selectedIndex[0]].sub, second1);
} else {
  second1 = [{text: '', value: 0}];
}

if (time[selectedIndex[0]].sub[selectedIndex[1]].hasOwnProperty('sub')) {
  creatList(time[selectedIndex[0]].sub[selectedIndex[1]].sub, third1);
} else {
  third1 = [{text: '', value: 0}];
}

var picker1 = new Picker({
	data: [first1, second1, third1],
  selectedIndex: selectedIndex,
	title: '日期选择'
});

picker1.on('picker.select', function (selectedVal, selectedIndex) {
  var text1 = first1[selectedIndex[0]].text;
  var text2 = second1[selectedIndex[1]].text;
  var text3 = third1[selectedIndex[2]] ? third1[selectedIndex[2]].text : '';

	nameEl1.innerText = text1 + '年 ' + text2 + '月 ' + text3+'日';
});

picker1.on('picker.change', function (index, selectedIndex) {
  if (index === 0){
    firstChange();
  } else if (index === 1) {
    secondChange();
  }

  function firstChange() {
    second1 = [];
    third1 = [];
    checked[0] = selectedIndex;
    var firstCity = time[selectedIndex];
    if (firstCity.hasOwnProperty('sub')) {
      creatList(firstCity.sub, second1);

      var secondCity = time[selectedIndex].sub[0]
      if (secondCity.hasOwnProperty('sub')) {
        creatList(secondCity.sub, third1);
      } else {
        third1 = [{text: '', value: 0}];
        checked[2] = 0;
      }
    } else {
      second1 = [{text: '', value: 0}];
      third1 = [{text: '', value: 0}];
      checked[1] = 0;
      checked[2] = 0;
    }

    picker1.refillColumn(1, second1);
    picker1.refillColumn(2, third1);
    picker1.scrollColumn(1, 0)
    picker1.scrollColumn(2, 0)
  }

  function secondChange() {
    third1 = [];
    checked[1] = selectedIndex;
    var first_index = checked[0];
    if (time[first_index].sub[selectedIndex].hasOwnProperty('sub')) {
      var secondCity = time[first_index].sub[selectedIndex];
      creatList(secondCity.sub, third1);
      picker1.refillColumn(2, third1);
      picker1.scrollColumn(2, 0)
    } else {
      third1 = [{text: '', value: 0}];
      checked[2] = 0;
      picker1.refillColumn(2, third1);
      picker1.scrollColumn(2, 0)
    }
  }

});

picker1.on('picker.valuechange', function (selectedVal, selectedIndex) {
  console.log(selectedVal);
  console.log(selectedIndex);
});

nameEl1.addEventListener('click', function () {
	picker1.show();
});



