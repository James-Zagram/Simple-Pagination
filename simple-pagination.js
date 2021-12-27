/*
 * Simple-Pagination
 * Copyright 2020
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

  this.create = object => {

    var format = '';
    const container = $(".simple-pagination-div");
    var container_count = container.children().length;

    if (object.show == undefined) {
      pagination_item_length = 3;
    }else{
      pagination_item_length = object.show;
    }

    if (object.size == undefined) {
      pagination_div_length = 4;
    }else{
      pagination_div_length = object.size;
    }

    pagination_pages = count_div(container, container_count, pagination_div_length);

    create_pagination_item(pagination_pages, object.show);

    // console.log($(".simple-pagination-item"));

    console.log(object.size);

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

    return counter + 1;

  }

  // creates the page-items that control the pagination
  function create_pagination_item(pages, pagination_length){

    for (var i = 0; i < pages; i++) {
      var item = $('<li class="page-item"><button class="page-link">' + (i + 1) + '</button></li>');

      item.insertBefore(".simple-pagination-next");

      if (i == 0) {
        item.find("button").addClass("sp-selection-style");
        item.addClass("sp-selection");
      }
      if (i >= pagination_length) {
        item.hide();
      }
    }

  }

  $(".simple-pagination-prev").click(function (){
    travel_pagination(1, false);
  });

  $(".simple-pagination-next").click(function (){
    travel_pagination(1, true);
  });

  //travels the pagination items
  function travel_pagination(change_value, direction){
    var selection_pos = $(".sp-selection").index();
    var pagination_length = $(".page-item").length - 2;

    console.log(pagination_length);

    if (pagination_length < pagination_pages) {
      if (isOdd(pagination_item_length)) {
        console.log(pagination_item_length);
      }else{
        console.log(pagination_item_length);
      }
    }

    if (pagination_item_length == pagination_pages){
      if (direction == true) {
        next(selection_pos);
      }else{
        prev(selection_pos);
      }
    }

    if (pagination_length > pagination_pages) {
      console.log("error");
    }
  }

  // changes the pagination item to the Previous number
  function prev(selection_pos){
    if (selection_pos > 1) {
      $(".page-item:eq(" + selection_pos + ")").find("button").removeClass("sp-selection-style");
      $(".page-item:eq(" + selection_pos + ")").removeClass("sp-selection");

      $(".page-item:eq(" + (selection_pos - 1) + ")").find("button").addClass("sp-selection-style");
      $(".page-item:eq(" + (selection_pos - 1) + ")").addClass("sp-selection");

    }
  }

  // changes the pagination item to the next number
  function next(selection_pos){

    if (selection_pos < pagination_item_length) {
        $(".page-item:eq(" + selection_pos + ")").find("button").removeClass("sp-selection-style");
        $(".page-item:eq(" + selection_pos + ")").removeClass("sp-selection");

        $(".page-item:eq(" + (selection_pos + 1) + ")").find("button").addClass("sp-selection-style");
        $(".page-item:eq(" + (selection_pos + 1) + ")").addClass("sp-selection");
    }

  }



  function isOdd(num) { return num == 2;}

  // console.log("hola");

}
