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

  console.log($(".pagination-div"));

  this.prueba = log => {
    console.log(log);
  }

  this.create = object => {

    var format = '';
    const container = $(".simple-pagination-div");
    var container_count = container.children().length;

    var pages = count_div(container, container_count, object.size);
    create_pagination_item(pages);

    console.log($(".simple-pagination-item"));

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

  function create_pagination_item(pages){

    for (var i = 0; i < pages; i++) {
      var item = $('<li class="page-item"><button class="page-link">' + (i + 1) + '</button></li>');

      item.insertBefore(".simple-pagination-next");

      if (i == 0) {
        item.find("button").addClass("sp-selection");
      }
    }

  }

  function prev(){

  }

  function next(){
    
  }

  // console.log("hola");

}
