function returnChampion(){
    var champ = $("#consultChamp").val()
    console.log(champ)
    $.ajax({
        url: "http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json",
        type: "GET",
        success: function(res){
            const champions = res.data;
            console.log(champions.Aatrox);
            // const c = champions.map()
            $.each(champions, function(index, value) {
                if(value.id === champ){
                //     document.getElementById("nameC").innerHTML = value;
                    console.log(value.blurb)
                    $("#nameC").html(value.id);
                    // document.getElementById("nameC").innerHTML = value.id;
                    document.getElementById("titleC").innerHTML = value.title;
                    document.getElementById("aboutC").innerHTML = value.blurb;
                    document.getElementById("partypeC").innerHTML = value.partype;

                }
            });
        }
    })
}
