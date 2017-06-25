// scripts.js - kanban board

$(function() {
    function randomString() { //każda kolumna i karteczka jest unikalna; funkcja losuje 10 elementów z tablicy znaków chars i składa je w jeden string.
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
       return str;
    }

    function Column(name) {
        var self = this; // useful for nested functions

        this.id = randomString();
        this.name = name;
        this.$element = createColumn();

        function createColumn() { //komponenty kolumny
    	    var $column = $('<div>').addClass('column');
            var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
            var $columnCardList = $('<ul>').addClass('column-card-list');
            var $columnDelete = $('<button>').addClass('btn-delete').text('x');
            var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');
            // EVENTY
            $columnDelete.click(function() {
	            self.removeColumn();
	        });
	        //Add a note after clicking on the button:
	        $columnAddCard.click(function() {
	            self.addCard(new Card(prompt("Enter the name of the card")));
	        });
            // elementy kolumny
	        $column.append($columnTitle)
                .append($columnDelete)
                .append($columnAddCard)
                .append($columnCardList);
            return $column;
        }
    }

    Column.prototype = {
        addCard: function(card) {
            this.$element.children('ul').append(card.$element);
        },
        removeColumn: function() {
            this.$element.remove();
        }
    };

    function Card(description) {
	    var self = this;

        this.id = randomString();
        this.description = description;
        this.$element = createCard(); //

        function createCard() {
	    
            var $card = $('<li>').addClass('card');
            var $cardDescription = $('<p>').addClass('card-description').text(self.description);
            var $cardDelete = $('<button>').addClass('btn-delete').text('x');

            $cardDelete.click(function(){
                self.removeCard();
            });

            $card.append($cardDelete)
	        .append($cardDescription);
            return $card;
        }           
    }

    Card.prototype = {
	    removeCard: function() {
	    this.$element.remove();
    }
}

    var board = {
        name: 'Kanban Board',
        addColumn: function(column) {
        this.$element.append(column.$element);
        initSortable();
        },
    
        $element: $('#board .column-container')
    };
    
    function initSortable() { // wyłączenie możliwości zaznaczania tekstu na kartach, które przeciągamy
        $('.column-card-list').sortable({
        connectWith: '.column-card-list',
        placeholder: 'card-placeholder'
        }).disableSelection();
    }

    $('.create-column') //przycisk umozliwiające dodawania kolumn 
        .click(function(){
        var name = prompt('Enter a column name'); // ... nazywanie ich
        var column = new Column(name);
    	board.addColumn(column);
    });

    // TWORZENIE KOLUMN
    var todoColumn = new Column('To do');
    var doingColumn = new Column('Doing');
    var doneColumn = new Column('Done');

    // DODAWANIE KOLUMN DO TABLICY
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);

    // TWORZENIE NOWYCH EGZEMPLARZY KART
    var card1 = new Card('New task');
    var card2 = new Card('Create kanban boards');

    // DODAWANIE KART DO KOLUMN
    todoColumn.addCard(card1);
    doingColumn.addCard(card2);
})