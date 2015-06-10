angular
    .module( 'colorhelper' )
    .controller( 'MainController', MainController );

MainController.$inject = [ 'status', 'colorscheme', 'dataservice', 'palette', '$scope' ];

function MainController( status, colorscheme, dataservice, palette, $scope ) {

    activate();

    function activate() {

        return getPalette( 'random' );

    }

    function getPalette( paletteType ) {

        return dataservice.getPalette( paletteType )
            .then( function( data ) {

                palette.set( data );
                colorscheme.update( data.colors[0] );
                $scope.palette = data;
                return $scope.palette;

            });

    }

    $scope.getPalette = function( paletteType ) {

        getPalette( paletteType );

    }

    // Updates the status (often synonymous with showing the status bar).
    $scope.$on( 'status-updated', function() {

        $scope.status = status.status;

    });

    // Update the colors of the website
    $scope.$on( 'colorscheme-updated', function() {

        $scope.colorscheme = { details: '#' + colorscheme.details };

    });

    // Remove color from the current palette.
    $scope.removeColor = function( i ) {

        palette.remove( i );

    };

    // App details
    $scope.app = {

        author: "Janne Klouman",
        version: "1.0 alpha",
        name: l( '%app.name' ),
        title: l( '%app.title' ),
        description: l( '$page.description' ),
        GitHubURL: "https://github.com/janneklouman/colorhelper"

    };

    // Wrapper function for localization in html
    $scope.ll = function ( s ) {

        return l( s );

    };

}