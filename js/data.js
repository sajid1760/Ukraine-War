$(document).ready(function () {
    createdatatable2();    
});

function createdatatable2() {

    d3.json('data/ukraine_war_data.json').then(function(data){

        console.log(data);
        data_columns = [];

        data_headers_real = ['data_id', 'event_date', 'event_type', 'sub_event_type', 'actor1', 'admin1', 'admin2', 'location', 'latitude', 'longitude', 'source'];
        data_headers = ['ID', 'Date', 'Incident Type', 'Incident Sub-Type', 'Main Instigator', 'Admin Region', 'Sub-Admin Region', 'Location', 'Latitude', 'Longitude', 'Source'];

        data_trimmed = [];
        for (k = 0; k < data.length; k++) {
            datum = data[k];
            // console.log(datum);
            ret_array = [];
            for (j = 0; j < data_headers_real.length; j++) {
                headerr = data_headers_real[j];
                ret_array.push(datum[headerr]);
            }
            data_trimmed.push(ret_array);            
        }

        // data_values = data.map(datum => Object.values(datum));
        // data_headers = Object.keys(data[0]);

        for (i = 0; i < data_headers.length; i++) {
            header = data_headers[i];
            title_dict = {'title': `${header}`};
            data_columns.push(title_dict);
        }

        // console.log(data_trimmed);
        // console.log(data_columns);

        $(document).ready(function() {

            $('#data_table').DataTable({
                data: data_trimmed,
                columns: data_columns,
                fixedColumns: true,
            });

        });

    });



    // d3.text('data/table_html.txt').then(function(t_string){
    //     document.getElementById("datatablecontainer").innerHTML += t_string;
    //     $(document).ready(function() {
    //         $('#data_table').DataTable();
    //     })       
    // }); 

}


// function createdatatable(data) {

//     // create header string



//     var starter_string = ` <thead> <tr> `;
//     var added_string = "";
//     var ender_string = ' </tr> </thead> ';

//     headers_list = Object.keys(data[0]);
//     // console.log(headers_list);

//     for (i = 0; i < headers_list.length; i++) {
//         added_string = ` <th>${headers_list[i]}</th> `;
//         starter_string = starter_string.concat(added_string);
//     }

//     var final_string = starter_string.concat(ender_string);
//     // console.log(final_string);

//     document.getElementById("data_table").innerHTML += final_string;

//     // add row data

//     document.getElementById("data_table").innerHTML += ` <tbody> `;

//     for (k = 0; k < 20; k++) {

//         var row_starter_string = ` <tr> `;
//         var row_added_string = "";
//         var row_ender_string = ` </tr> `;

//         row_list = Object.values(data[k]);
//         // console.log(row_list);

//         for (j = 0; j < row_list.length; j++) {
//             row_added_string = ` <td>${row_list[j]}</td> `;
//             row_starter_string = row_starter_string.concat(row_added_string);
//         }

//         var row_final_string = row_starter_string.concat(row_ender_string);
//         // console.log(row_final_string);

//         document.getElementById("data_table").innerHTML += row_final_string;
    
//     }

//     document.getElementById("data_table").innerHTML += ` </tbody> `;

//     $(document).ready(function() {

//         $('#data_table').DataTable();

//     })

// }