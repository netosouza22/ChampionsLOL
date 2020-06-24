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
    let stats = Object.values(value.stats);
    let info = Object.values(value.info);
    startChart(info);
 
    console.log(stats);
    $("#champImg").attr({
        src: `img/champion/championPic/${name}.png`,
    });
    $("#name").text(name);
    $("#title").text(title);

    //stats
    $("#hp").text(stats[0]);
    $("#hpPerLevel").text(stats[1]);
    $("#mp").text(stats[2]);
    $("#mpPerLevel").text(stats[3]);

    $("#arm").text(stats[5]);
    $("#armpl").text(stats[6]);
    $("#sb").text(stats[7]);
    $("#sbpl").text(stats[8]);

    $("#hpr").text(stats[10]);
    $("#hprpl").text(stats[11]);
    $("#mpr").text(stats[12]);
    $("#mprl").text(stats[13]);

    $("#ad").text(stats[16]);
    $("#adpl").text(stats[17]);
    $("#as").text(stats[18]);
    $("#aspl").text(stats[19]);
    
    //Lore
    $("#lore").text(lore);

}
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
