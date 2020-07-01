$("#btnRem").click(verifyName);
// $("#btnRem").click(startChart);


function verifyName(){
    var champ = $("#consultChamp").val().toLowerCase();
    console.log(champ);
    let champion = champ.charAt(0).toUpperCase() + champ.slice(1);
    console.log(champion);

    const url = `http://ddragon.leagueoflegends.com/cdn/10.12.1/data/en_US/champion/${champion}.json`
     $.get(url)
     .done(function getData(res) {
        let objData = res.data;
        $.each(objData, function(index, value){
            var champ = value;
            useDataChampion(champ);
        });
    })
     .fail(() => {
         alert('Houve um erro na solicitação');
        });
}

function useDataChampion(value){
    //information
    let name = value.id;
    let title = value.title;
    let lore = value.lore;
    //Stats
    var stats = Object.values(value.stats);
    let info = Object.values(value.info);
    startChart(info);
 
    $("#champImg").attr({
        src: `img/champion/championPic/${name}.png`,
    });
    $("#name").text(name);
    $("#title").text(title);

    //stats
    $("#hp").text(stats[0]);
    $("#mp").text(stats[2]);
    $("#arm").text(stats[5]);
    $("#sb").text(stats[7]);
    $("#hpr").text(stats[10]);
    $("#mpr").text(stats[12]);
    $("#ad").text(stats[16]);
    $("#as").text(stats[19]);
    $("#ms").text(stats[4]);
    $("#ar").text(stats[9]);
    calcPerLevel(stats);

    //Lore
    $("#lore").text(lore);
}
function calcPerLevel(stats){
  var stats1 = stats;
    
  let hppl = stats[1];
  let mppl = stats[3];
  let armpl = stats[6];
  let sbpl = stats[8];
  let hprpl = stats[11];
  let mprl = stats[13];
  let adpl = stats[17];
  let aspl = stats[18]/100;

  $("#selectLevel").change(function (){
    var level = $("#selectLevel option:selected").val();

    var result1 = stats[0] + hppl * level;
    var result2 = stats[2] + mppl * level;
    var result3 = stats[5] + armpl * level;
    var result4 = stats[7] + sbpl * level;
    var result5 = stats[10] + hprpl * level;
    var result6 = stats[12] + mprl * level;
    var result7 = stats[16] + adpl * level;
    var result8 = stats[18] + aspl * level;

    $("#hp").text(result1);
    $("#mp").text(result2);
    $("#arm").text(result3);
    $("#sb").text(result4);
    $("#hpr").text(result5);
    $("#mpr").text(result6);
    $("#ad").text(result7);
    $("#as").text(result8);
  });


  // let array = [hppl, mppl, armpl, sbpl, hprpl, mprl, adpl, aspl];
  // console.log(array);
  // return array;
}



// $("#selectLevel").change(calcPerLevel);

// function calcPerLevel(){

//   // var stats = getStats();

//   var level = $("#selectLevel option:selected").val();
//   // console.log(stats);
//   console.log(level);



// };

function startChart(info){
    let attack = info[0];
    let defense = info[1];
    let magic = info[2];
    let difficulty = info[3];
var ctx = document.getElementById('polar-chart').getContext('2d');
;
var myChart = new Chart(ctx, {
    type: 'polarArea',
    data: {
    labels: ["Attack", "Magic", "Defense", "Difficulty"],
    datasets: [
    {
      label: 'Attributes',  
      backgroundColor: ["red", "blue","black","purple"],
      data: [attack, magic, defense, difficulty]
    }
  ]
},
options: {
  title: {
    display: true,
  }
}
});
}
