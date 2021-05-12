$(document).ready(function(){
    (function(){
        $.ajax({
            type : "GET",
            url : "/api/degree/retrieveinfos",
            success: function(response){
              $.each(response.degreeInfos, (i, degree) => {

              /*  <button type="button" class="btn btn-danger btn_delete" data-toggle="modal" data-target="#myModal">
                Open modal
              </button>*/

                let deleteButton = '<button ' +
                                        'id=' +
                                        '\"' + 'btn_delete_' + degree.dID + '\"'+
                                        ' type="button" class="btn btn-danger btn_delete" data-toggle="modal" data-target="#delete-modal"' +
                                        '>&times</button>';

                let get_More_Info_Btn = '<button' +
                                            ' id=' + '\"' + 'btn_id_' + degree.dID + '\"' +
                                            ' type="button" class="btn btn-info btn_id">' +
                                            degree.dID +
                                            '</button>';

                let tr_id = 'tr_' + degree.dID;
                let degreeRow = '<tr id=\"' + tr_id + "\"" + '>' +
                          '<td>' + get_More_Info_Btn + '</td>' +
                          '<td class=\"td_name\">' + degree.name.toUpperCase() + '</td>' +
                          '<td class=\"td_type\">' + degree.type + '</td>' +
                          '<td>' + deleteButton + '</td>' +
                          '</tr>';
                $('#degreeTable tbody').append(degreeRow);
              });
            },
            error : function(e) {
              alert("ERROR: ", e);
              console.log("ERROR: ", e);
            }
        });
    })();

    (function(){
        let pathname = window.location.pathname;
        if (pathname == "/degrees/") {
            $(".nav .nav-item a:last").addClass("active");
        }
    })();
});
