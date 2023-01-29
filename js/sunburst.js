

$(document).ready(function() {
    
        d3.json('data/ukraine_war_data.json').then(function(data) {

        populatefilterlists(data);
        var parent_string = `Instigator: All<br>Source: All<br>Month: All<br>Minium Fatalities: All<br>Maximum Fatalities: All`
        makesunburst(data, parent_string);
        $("#filter").on("click", function () {
            let datafilt = filterdata(data);
            makesunburst(datafilt[0], datafilt[1]);
          });

    });
});


function populatefilterlists(data) {

    //main event list

    const events_list = new Set();
    const sub_events_list = new Set();
    const sources_list = new Set();
    const instigator_list = new Set();
    const month_list = new Set();

    data.forEach((datapoints) => {
        events_list.add(datapoints.event_type);
        sub_events_list.add(datapoints.sub_event_type);
        sources_list.add(datapoints.source2);
        instigator_list.add(datapoints.actor1);
        date_array = datapoints.event_date.split("-");
        month_list.add(date_array[1]);
    })

    var events_list_array = Array.from(events_list);
    var sub_events_list_array = Array.from(sub_events_list);
    var sources_list_array = Array.from(sources_list);
    var instigator_list_array = Array.from(instigator_list);
    var min_fatalities_array = [1, 2, 3, 4, 5, 10, 15, 20, 50, 100, 350];
    var max_fatalities_array = [100, 50, 20, 15, 10, 5, 4, 3, 2, 1];
    var month_list_array = Array.from(month_list);

    // events_list_array.forEach((events) => d3.select("#selmaineventset").append("option").text(events));
    // sub_events_list_array.forEach((events) => d3.select("#selsubeventset").append("option").text(events));
    sources_list_array.forEach((source) => d3.select("#selsourceset").append("option").text(source));
    month_list_array.forEach((month) => d3.select("#selmonthset").append("option").text(month));
    min_fatalities_array.forEach((fatalnumber) => d3.select("#selminfatalset").append("option").text(fatalnumber));
    max_fatalities_array.forEach((fatalnumber) => d3.select("#selmaxfatalset").append("option").text(fatalnumber));   
    instigator_list_array.forEach((instigator) => d3.select("#selinstigatorset").append("option").text(instigator));
}

function filterdata(data) {

    // main_event = d3.select("#selmaineventset").node().value;
    //sub_main_event = d3.select("#selsubmaineventset").node().value;
    sel_month = d3.select("#selmonthset").node().value;
    sel_source = d3.select("#selsourceset").node().value;
    sel_instigator = d3.select("#selinstigatorset").node().value;
    min_fatal = d3.select("#selminfatalset").node().value;
    max_fatal = d3.select("#selmaxfatalset").node().value;

    var dataf = data;

    if (max_fatal > min_fatal) {

            d3.select("#maxfatalerror").text("");

            // if (main_event == "All") {
            //     dataf = dataf;
            // }
            // else {
            //     dataf = dataf.filter(datum => datum.event_type == main_event);
            // }

            
            if (sel_month == "All") {
                dataf = dataf;
            }
            else {
                dataf = dataf.filter(datum => datum.event_date.split("-")[1] == sel_month);
            }

            if (sel_source == "All") {
                dataf = dataf;
            }
            else {
                dataf = dataf.filter(datum => datum.source2 == sel_source);
            }

            if (sel_instigator == "All") {
                dataf = dataf;
            }
            else {
                dataf = dataf.filter(datum => datum.actor1 == sel_instigator);
            }

            dataf = dataf.filter(datum => datum.fatalities >= min_fatal);
            dataf = dataf.filter(datum => datum.fatalities <= max_fatal);

            // console.log(dataf);
            
            var parent_string = "hello";

            parent_string = `Instigator: ${sel_instigator}<br>Source: ${sel_source}<br>Month: ${sel_month}<br>Minium Fatalities: ${min_fatal}<br>Maximum Fatalities: ${max_fatal}`
            
            console.log(parent_string);

            return [dataf, parent_string];
    }
    else {

            d3.select("#maxfatalerror").text("Maximum fatalities must exceed minimum");
            // console.log(max_fatal);
            // console.log(min_fatal);

            return 0;

    }

    
}



function makesunburst(data, parent_string) {

    if (data != 0) {

        let dataf = data;

        // console.log(Object.keys(data[0]));

        labels_data = [];
        parents_data = [];
        values_data = [];

        // create label lists

        event_type_dict = {};
        subevent_type_dict = {};

        for (i = 0; i < dataf.length; i++) {

            battle_event = data[i].event_type;
            battle_sub_event = data[i].sub_event_type;
            event_type_list = Object.keys(event_type_dict);
            if (event_type_list.includes(battle_event)) {
                event_type_dict[`${battle_event}`][0] +=1;
                
                subevent_type_dict = event_type_dict[`${battle_event}`][1];

                subevent_type_list = Object.keys(subevent_type_dict);

                if (subevent_type_list.includes(battle_sub_event)) {
                    event_type_dict[`${battle_event}`][1][`${battle_sub_event}`] +=1;
                }
                else {
                    event_type_dict[`${battle_event}`][1][`${battle_sub_event}`] = 1;
                }

            } 
            else {
                subevent_type_dict = {};
                event_type_dict[`${battle_event}`] = [1];
                subevent_type_dict[`${battle_sub_event}`] = 1;
                event_type_dict[`${battle_event}`].push(subevent_type_dict);       
            }

        }

        // console.log(event_type_dict);

        event_type_list = Object.keys(event_type_dict);

        for (j = 0; j < event_type_list.length; j++) {
            labels_data.push(event_type_list[j]);
            parents_data.push(parent_string);
            event_typ = event_type_list[j];
            values_data.push(event_type_dict[`${event_typ}`][0]);

            subevent_type_dict = event_type_dict[`${event_typ}`][1];
            subevent_type_list = Object.keys(subevent_type_dict);

            for (k = 0; k < subevent_type_list.length; k++) {
                labels_data.push(subevent_type_list[k]);
                parents_data.push(event_type_list[j]);
                subevent_typ = subevent_type_list[k];
                values_data.push(subevent_type_dict[`${subevent_typ}`]);

            }

        }


        // console.log(labels_data);
        // console.log(parents_data);
        // console.log(values_data);



        var trace1 = [
            {
            "type": "sunburst",
            "labels": labels_data,
            "parents": parents_data,
            "values":  values_data,
            "leaf": {"opacity": 0.4},
            "marker": {"line": {"width": 2}},
            "branchvalues": 'total'
            }];
            
            var layout = {
            "margin": {"l": 0, "r": 0, "b": 0, "t": 0},
            sunburstcolorway:['#2C3E50', '#005BBC', '#96C59C', '#FFD600', '#A3B8CC', '#484538', '#023B1C', '#A18276', '#D3D5D7', '#191716', '#CD533B', '#25A18E', '#CAC4CE', '#EBBAB9', '#8D3B72', '#F68E5F', '#69353F']
            };
            
            
            Plotly.newPlot('sunburstgraph', trace1, layout, {showSendToCloud: true});
            
            myPlot = document.getElementById("sunburstgraph");

    }

}