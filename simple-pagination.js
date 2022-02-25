/*
 * Simple-Pagination
 * Copyright 2022
 * Author: Jaime Zaragoza
 * All Rights Reserved.
 * Use, reproduction, distribution, and modification of this code is subject to the terms and
 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
 *
 * Project: https://https://github.com/James-Zagram/Simple-Pagination
 */


function Simple_pagination(){

  // console.log($(".pagination-div"));

  var pagination_item_length = 0;
  var pagination_div_length = 0;
  var pagination_pages = 0
  var front = 0;
  var back = 0;
  var center_position = false;

  var center_position_right = false;
  var center_position_left = false;
  var odd_center = 0;

  var travel_increment = 0;
  var travel_decrement = 0;

  this.create = object => {

    //sets class where the pagination is going to happén and the number of items to paginate
    const container = $(".simple-pagination-div");
    var container_count = container.children().length;

    if (object.show == undefined) {
      // sets default pagination to 3
      pagination_item_length = 3;
    }else{
      pagination_item_length = object.show;
    }

    if (object.size == undefined) {
      //sets default pages length to 4
      pagination_div_length = 4;
    }else{
      pagination_div_length = object.size;
    }

    odd_center = Math.ceil(pagination_item_length / 2);


    //detects if there is any errors regarding the calulation of pagination items, and divs to paginate.
    if ( (container_count / pagination_div_length) >= pagination_item_length ) {
      // console.log("bien");
    }else{
      console.log("Simple-Pagination Error: Wrong shown size");
      // return;
    }

    //adds a class to each div to paginate.
    pagination_pages = count_div(container, container_count, pagination_div_length);

    //calculates the number of hidden items on front. [1][2][3] [4][5] <-- hidden
    front = pagination_pages - pagination_item_length;

    //creates the numbers (pagination items).
    create_pagination_item(pagination_pages, object.show);

  }

  //counts and adds a class to each div so it can be hiden and shown
  function count_div(container, container_count, pagination_size){

    var counter = 0;
    var size = pagination_size;

    for (var i = 0; i <= container_count; i++) {

        container.find("div:eq(" + i + ")").addClass("sp-page-" + (counter + 1));

        if (counter != 0) {
          // container.find("div:eq(" + i + ")").hide();
        }

        if (i == (pagination_size - 1)) {
          pagination_size += size;
          counter++;
        }

    }

    return counter;
  }

  // creates the page-items that control the pagination
  function create_pagination_item(pages, pagination_length){

    for (var i = 0; i < pages; i++) {
      //creates the number. ex. [1]
      var item = $('<li class="page-item"><button class="page-link">' + (i + 1) + '</button></li>');

      //inserts if before the next button
      item.insertBefore(".simple-pagination-next");

      //selects the first item (adds background color)
      if (i == 0) {
        item.find("button").addClass("sp-selection-style");
        item.addClass("sp-selection");
      }

      //hides items where there are more that the user expects
      if (i >= pagination_length) {
        item.hide();
      }
    }

    //detects click on the numbers [item]
    $(".page-item").click(function (){
      //sends the item index and class

      if ($(this).attr("class").indexOf("simple-pagination-next") >= 0 || $(this).attr("class").indexOf("simple-pagination-prev") >= 0) {

      }else{
        change_selection($(this).index());
      }
    });

  }

  //detects button press [prev]
  $(".simple-pagination-prev").click(function (){
    // sends direction to travel
    travel_pagination(false);
  });

  //detects button press [next]
  $(".simple-pagination-next").click(function (){
    // sends direction to travel
    travel_pagination(true);
  });

  //travels the pagination items
  function travel_pagination(direction){
    //detecs the position in the items and ignores the prev and next buttons
    var selection_pos = $(".sp-selection").index();
    // console.log(pagination_item_length);
    // console.log(pagination_pages);

    // console.log("------------------------------");
    // console.log("selec: " + selection_pos);
    // console.log("f: " + front);
    // console.log("b: " + back);
    // console.log("pos: " + center_position);

    // if (pagination_item_length < pagination_pages) {

      //checks if the number of pagination items is odd
      if (isOdd(pagination_item_length) == 1) {
        //calulates the center of the pagination items based on the number of visible items
        var center_item = Math.ceil(pagination_item_length / 2);

        // console.log("center: " + center_item);

        //travel to the right
        if (direction == true) {

          //check if position is on the center of the pagination items
          if (center_position == false) {
            var future_selection_pos = selection_pos + 1;

            //checks if the travel is going to end on the center of the pagination items
            if (future_selection_pos == center_item) {
              center_position = true;
            }

            // if (center_position = true) {
            //   odd_center = selection_pos + 1;
            // }

            //changes focus to the next item
            next(selection_pos);

          }else{
            front--;
            back++;

            //if there is not more items on front, changes center position
            if (front == 0) {
              center_position = false;
            }

            //hides and shows prev and next items
            $(".page-item:eq(" + (selection_pos + center_item) + ")").css("display", "block");
            $(".page-item:eq(" + (selection_pos - (center_item - 1)) + ")").css("display", "none");
            next(selection_pos);
          }

        }else{  //travel to the left

          if (center_position == false) {
            var future_selection_pos = selection_pos - 1;

            //checks if the travel is going to end on the center of the pagination items
            if (future_selection_pos == pagination_pages - center_item + 1) {
              center_position = true;
            }

            //changes focus to the previous item
            prev(selection_pos);

          }else{
            back--;
            front++;

            //if there is not more items on back, changes center position
            if(back == 0){
              center_position = false;
            }

            //hides and shows prev and next items
            $(".page-item:eq(" + (selection_pos - center_item) + ")").css("display", "block");
            $(".page-item:eq(" + (selection_pos + (center_item - 1)) + ")").css("display", "none");
            prev(selection_pos);

          }

        }


      }else{

        //calulates the center of the pagination items based on the number of visible items
        var center_item = Math.ceil(pagination_item_length / 2 + 1);

        //travel to the right
        if (direction == true) {

          //if there is no more items on front, it doesnt move the items.
          if (front == 0) {
            center_position = false;
          }

          //check if position is on the center of the pagination items
          if (center_position == false) {
            var future_selection_pos = selection_pos + 1;

            //checks if the travel is going to end on the center of the pagination items
            if (future_selection_pos == center_item) {
              center_position = true;
            }

            //Detects if the user has this condition active, so it can activate the else bellow
            if (center_position_left == true) {
              center_position = true;
              center_position_left = false;
            }

            //changes focus to the next item
            next(selection_pos);

          }else{
            front--;
            back++;

            //if there is not more items on front, changes center position
            if (front == 0) {
              center_position = false;
            }

            //hides and shows prev and next items
            $(".page-item:eq(" + (selection_pos + center_item - 1) + ")").css("display", "block");
            $(".page-item:eq(" + (selection_pos - (center_item - 1)) + ")").css("display", "none");
            next(selection_pos);
          }

        }else{  //travel to the left


          //if there is no more items on back, it doesnt move the items.
          if (back == 0) {
            center_position_left = false;
          }

          //checks the if the user was traveling left
          if (center_position_left == false) {
            var future_selection_pos = selection_pos - 1;

            //checks if the travel was going to the right
            if (center_position == false) {

              //checks if the user is on the end of the pagination items.
              if (future_selection_pos == pagination_pages - center_item + 1) {
                center_position = false;
                center_position_left = true;
              }
            }else{
              center_position_left = true;
              center_position = false;
            }

            //changes focus to the previous item
            prev(selection_pos);

          }else{
            back--;
            front++;

            //if there is not more items on back, changes center position
            if(back == 0){
              center_position_left = false;
            }

            //hides and shows prev and next items
            $(".page-item:eq(" + (selection_pos - center_item + 1) + ")").css("display", "block");
            $(".page-item:eq(" + (selection_pos + (center_item - 1)) + ")").css("display", "none");
            prev(selection_pos);

          }

        }

      }

  }

  // function to move the selection based on the user click on the pagination items
  function change_selection(item_index){
      // console.log("--------------------------------------");
      // console.log("item_index: " + item_index);
      // console.log("f: " + front);
      // console.log("B: " + back);
      // console.log("pag: " + pagination_pages);
      //
      // console.log("center: " + odd_center);

        //checks if the length of the items is odd
        if (isOdd(pagination_item_length) == 1) {
          //calculates the beging and end items.
          var lateral_items = Math.ceil((pagination_item_length - 1) / 2);

          //checks if the item clicked is on the right of the center.
          if (item_index > odd_center) {
            // console.log("entra_mas");



            //enters if there is still items hidden
            if (front > 0) {
              //calculates the "steps" that will be necesary to move the items based on the current position of the user
              travel_increment = item_index - odd_center + travel_increment;

              //calculates the real travel distance that can be achieved clicking the items.
              real_travel = item_index - odd_center;

              //if the click doesnt exceeds the lateral items, calculates the center.
              if (item_index < (pagination_pages - lateral_items) ) {
                //recalculates the center of the items.
                odd_center = item_index;
              }else{
                //adds a maximum center value
                odd_center = pagination_pages - lateral_items;
              }

              //enters if there is more "steps" than items hidden and the steps are changed to the number of items hidden
              if (front >= real_travel) {
                //changes the value of the tracker for hidden items
                front = front - real_travel;
                back = back + real_travel;
                move_items(true);
              }else{
                move_items(true);
                //changes the value of the tracker for hidden items
                back = back + front;
                front -= front;
              }

            }else{
              selection();
            }
          }

          //checks if the click is on the center of the items.
          if (item_index == odd_center) {
            selection();
          }

          //check if the item clicked is on the left of the center.
          if (item_index < odd_center){
            // console.log("entra_menos");
            // console.log("back: " + back);

            //enters if there is still items hidden
            if (back > 0) {
              //calculates the "steps" that will be necesary to move the items based on the current position of the user
              travel_decrement = odd_center - item_index + travel_decrement;

              //calculates the real travel distance that can be achieved clicking the items.
              real_travel = odd_center - item_index;
              // console.log("travel: " + real_travel );

              // //if the click doesnt exceeds the lateral items, calculates the center.
              if (item_index < (pagination_pages - lateral_items) ) {
                //recalculates the center of the items.
                odd_center = item_index;
              }else{
                //adds a maximum center value
                odd_center = pagination_pages - lateral_items;
              }

              // console.log("new center: " + odd_center);

              //enters if there is more "steps" than items hidden and the steps are changed to the number of items hidden
              if (back >= real_travel) {
                //changes the value of the tracker for hidden items
                back = back - real_travel;
                front = front + real_travel;
                move_items(false);
              }else{
                //changes the value of the tracker for hidden items
                back -= back;
                front += front;
                move_items(false);
              }

            }else{
              selection();
            }

          }

        }else{

        }

      //hiddes and shows the items according to the parameters given.
      function move_items(direction){

        // if the front or back are out of hidden items, sets the center position.
        if (front == 0 || back == 0) {
          center_position = false;
        }else{
          center_position = true;
        }

        // enters when the user clicks to the right of the center item.
        if (direction == true) {
          var dynamic_increment = Math.ceil((pagination_item_length - 1) / 2);
          var dynamic_decrement = item_index - dynamic_increment;

          //limits the max value for dynamic decrement
          if (dynamic_decrement > pagination_pages - pagination_item_length) {
            dynamic_decrement = pagination_pages - pagination_item_length + 1;
          }

          dynamic_increment = item_index + dynamic_increment + 1

          // console.log("mover +");

          //hides the items on the left of the clicked item.
          for (var i = 1; i < dynamic_decrement; i++) {
            $(".page-item:eq(" + i + ")").css("display", "none");
          }

          //shows the items on the right of the clicked items.
          for (var i = item_index; i < dynamic_increment; i++) {
            $(".page-item:eq(" + i + ")").css("display", "block");
          }

        }else{
          var dynamic_increment = Math.ceil((pagination_item_length - 1) / 2);
          var dynamic_decrement = item_index - dynamic_increment - 1;

          // if (dynamic_decrement > pagination_pages - pagination_item_length) {
          //   dynamic_decrement = pagination_pages - pagination_item_length + 1;
          // }

          dynamic_increment = item_index + dynamic_increment + 1;

          // console.log("mover -");

          //hides the items to the right
          for (var i = dynamic_increment; i <= pagination_pages; i++) {
            $(".page-item:eq(" + i + ")").css("display", "none");
          }

          //shows the items on the left of the clicked items.
          for (var i = item_index; i > dynamic_decrement; i--) {
            $(".page-item:eq(" + i + ")").css("display", "block");
          }
        }

        // console.log("dy+ : " + dynamic_increment);
        // console.log("dy- : " + dynamic_decrement);

        selection();
      }

      function selection(){
        $(".page-item").find("button").removeClass("sp-selection-style");
        $(".page-item").removeClass("sp-selection");

        $(".page-item:eq(" + item_index + ")").find("button").addClass("sp-selection-style");
        $(".page-item:eq(" + item_index + ")").addClass("sp-selection");
      }
  }


  // changes the pagination "focus" to the Previous number
  function prev(selection_pos){
    //prevents the focus from going backwars when the selection is 1
    if (selection_pos > 1) {
      $(".page-item:eq(" + selection_pos + ")").find("button").removeClass("sp-selection-style");
      $(".page-item:eq(" + selection_pos + ")").removeClass("sp-selection");

      $(".page-item:eq(" + (selection_pos - 1) + ")").find("button").addClass("sp-selection-style");
      $(".page-item:eq(" + (selection_pos - 1) + ")").addClass("sp-selection");

    }
  }

  // changes the pagination "focus" to the next number
  function next(selection_pos){
    //prevents the focus from going over the limit of items.
    if (selection_pos < pagination_pages) {
        $(".page-item:eq(" + selection_pos + ")").find("button").removeClass("sp-selection-style");
        $(".page-item:eq(" + selection_pos + ")").removeClass("sp-selection");

        $(".page-item:eq(" + (selection_pos + 1) + ")").find("button").addClass("sp-selection-style");
        $(".page-item:eq(" + (selection_pos + 1) + ")").addClass("sp-selection");
    }

  }


  //detects if numbre is odd
  function isOdd(num) { return num % 2;}

}
