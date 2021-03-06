angular
    .module( 'colorhelper' )
    .directive( 'cEditDialog', cEditDialog );

cEditDialog.$inject = [ 'palette'  ];

function cEditDialog( palette ) {

    return {

        restrict: 'E',
        templateUrl: '/resource/template/cDialog.html',
        replace: true,
        scope: {
            show: '=',
            idx: '='
        },
        link: function( scope ){

            // Initialize value for top border columns.
            scope.colWidth = 100;

            // ID used for DOM element.
            scope.id = 'edit-color-' + scope.idx;

            // Strings for the dialog.
            scope.strings = {

                title: l( '%dialog.edit.color' ),
                execute: l( '%dialog.confirm' ),
                cancel: l( '%dialog.cancel' ),
                inputValue: ''

            };

            // Gives us some colors to work with (current palette's).
            scope.$on( 'palette-updated', function() {

                scope.strings.inputValue = '#' + palette.current.colors[ scope.idx ];

                // Initialize colorpicker on our input.
                $( '#' + scope.id ).colorPicker({color: scope.hex });

                scope.colors =  palette.current.colors;
                scope.colWidth = 100 / scope.colors.length;

            });

            // Adds color to the palette and closes the dialog.
            scope.execute = function() {

                var color = $( '#edit-color-' + scope.idx ).val().substring( 1 );
                palette.editColor( scope.idx, color );
                scope.hide();

            };

            // Hides the dialog
            scope.hide = function() {

                scope.strings.inputValue = '';
                scope.show = false;

            };

        }

    };

}