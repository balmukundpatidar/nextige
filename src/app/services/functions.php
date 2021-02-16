<?php
/**
 * wpcharming functions and definitions
 *
 * @package WPCharming
 */

/**
 * Define theme constants
 */
$theme_data   = wp_get_theme();
if ( $theme_data->exists() ) {
  define( 'WPC_THEME_NAME', $theme_data->get( 'Name' ) );
  define( 'WPC_THEME_VERSION', $theme_data->get( 'Version' ) );
}

/**
 * Set the content width based on the theme's design and stylesheet.
 */
if ( ! isset( $content_width ) ) {
  $content_width = 800; /* pixels */
}

if ( ! function_exists( 'wpcharming_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function wpcharming_setup() {

  /*
   * Make theme available for translation.
   * Translations can be filed in the /languages/ directory.
   * If you're building a theme based on WPCharming, use a find and replace
   * to change 'wpcharming' to the name of your theme in all the template files
   */
  load_theme_textdomain( 'wpcharming', get_template_directory() . '/languages' );

  // Add default posts and comments RSS feed links to head.
  add_theme_support( 'automatic-feed-links' );

  // Use shortcodes in text widgets.
  add_filter( 'widget_text', 'do_shortcode' );

  /*
   * Let WordPress manage the document title.
   * By adding theme support, we declare that this theme does not use a
   * hard-coded <title> tag in the document head, and expect WordPress to
   * provide it for us.
   */
  add_theme_support( 'title-tag' );

  /*
   * Enable support for Post Thumbnails on posts and pages.
   *
   * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
   */
  add_theme_support( 'post-thumbnails' );
  add_image_size( 'small-thumb', 400, 200, true );
  add_image_size( 'medium-thumb', 600, 300, true );
  add_image_size( 'blog-large', 800, 400, true );

  // This theme uses wp_nav_menu() in one location.
  register_nav_menus( array(
    'primary' => __( 'Primary', 'wpcharming' ),
    'footer' => __( 'Footer', 'wpcharming' ),
    'domestic' => __( 'Domestic', 'wpcharming' ),
    'commercial' => __( 'Commercial', 'wpcharming' ),
    'terms_and_condition' => __( 'Terms And Conditions', 'wpcharming' ),
    //'footer' => __( 'Footer Bottom Right', 'wpcharming' ),
  ) );

  // This theme styles the visual editor to resemble the theme style.
  add_editor_style( 'assets/css/editor-style.css' );

  /*
   * Switch default core markup for search form, comment form, and comments
   * to output valid HTML5.
   */
  add_theme_support( 'html5', array(
    'search-form', 'comment-form', 'comment-list', 'gallery', 'caption',
  ) );

  /*
   * Enable support for Post Formats.
   * See http://codex.wordpress.org/Post_Formats
   */
  // add_theme_support( 'post-formats', array(
  //  'aside', 'image', 'video', 'quote', 'link',
  // ) );

  /*
   * Enable excerpt for page by default.
   * See https://codex.wordpress.org/Function_Reference/add_post_type_support
   */
  add_post_type_support('page', 'excerpt');

}
endif; // wpcharming_setup
add_action( 'after_setup_theme', 'wpcharming_setup' );

/**
 * Register widget area.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_sidebar
 */
function wpcharming_widgets_init() {
  register_sidebar( array(
    'name'          => __( 'Blog Sidebar', 'wpcharming' ),
    'id'            => 'sidebar-1',
    'description'   => '',
    'before_widget' => '<aside id="%1$s" class="widget %2$s">',
    'after_widget'  => '</aside>',
    'before_title'  => '<h4 class="widget-title">',
    'after_title'   => '</h4>',
  ) );
  register_sidebar( array(
    'name'          => __( 'Page Sidebar', 'wpcharming' ),
    'id'            => 'sidebar-2',
    'description'   => '',
    'before_widget' => '<aside id="%1$s" class="widget %2$s">',
    'after_widget'  => '</aside>',
    'before_title'  => '<h4 class="widget-title">',
    'after_title'   => '</h4>',
  ) );
  register_sidebar( array(
    'name'          => __( 'WooCommerce Sidebar', 'wpcharming' ),
    'id'            => 'sidebar-woo',
    'description'   => '',
    'before_widget' => '<aside id="%1$s" class="widget %2$s">',
    'after_widget'  => '</aside>',
    'before_title'  => '<h4 class="widget-title">',
    'after_title'   => '</h4>',
  ) );

  register_sidebar( array(
    'name'          => __( 'Footer 1', 'wpcharming' ),
    'id'            => 'footer-1',
    'description'   => wpcharming_sidebar_desc( 'footer-1' ),
    'before_widget' => '<aside id="%1$s" class="widget %2$s">',
    'after_widget'  => '</aside>',
    'before_title'  => '<h3 class="widget-title">',
    'after_title'   => '</h3>',
  ) );
  register_sidebar( array(
    'name'          => __( 'Footer 2', 'wpcharming' ),
    'id'            => 'footer-2',
    'description'   => wpcharming_sidebar_desc( 'footer-2' ),
    'before_widget' => '<aside id="%1$s" class="widget %2$s">',
    'after_widget'  => '</aside>',
    'before_title'  => '<h3 class="widget-title">',
    'after_title'   => '</h3>',
  ) );
  register_sidebar( array(
    'name'          => __( 'Footer 3', 'wpcharming' ),
    'id'            => 'footer-3',
    'description'   => wpcharming_sidebar_desc( 'footer-3' ),
    'before_widget' => '<aside id="%1$s" class="widget %2$s">',
    'after_widget'  => '</aside>',
    'before_title'  => '<h3 class="widget-title">',
    'after_title'   => '</h3>',
  ) );
  register_sidebar( array(
    'name'          => __( 'Footer 4', 'wpcharming' ),
    'id'            => 'footer-4',
    'description'   => wpcharming_sidebar_desc( 'footer-4' ),
    'before_widget' => '<aside id="%1$s" class="widget %2$s">',
    'after_widget'  => '</aside>',
    'before_title'  => '<h3 class="widget-title">',
    'after_title'   => '</h3>',
  ) );

  register_sidebar( array(
    'name'          => __( 'Top Bar Left', 'wpcharming' ),
    'id'            => 'topbar-left',
    'description'   => wpcharming_topbar_desc( 'topbar-left' ),
    'before_widget' => '<aside class="topbar-widget widget %2$s">',
    'after_widget'  => '</aside>',
    //'before_title'  => '<h3 class="widget-title">',
    //'after_title'   => '</h3>',
  ) );
  register_sidebar( array(
    'name'          => __( 'Top Bar Right', 'wpcharming' ),
    'id'            => 'topbar-right',
    'description'   => wpcharming_topbar_desc( 'topbar-right' ),
    'before_widget' => '<aside class="topbar-widget widget %2$s">',
    'after_widget'  => '</aside>',
    //'before_title'  => '<h3 class="widget-title">',
    //'after_title'   => '</h3>',
  ) );
}
add_action( 'widgets_init', 'wpcharming_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function wpcharming_scripts() {
  global $wpc_option;
  //https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css
  // Stylesheet
  wp_enqueue_style( 'wpcharming-style', get_stylesheet_uri() );
  wp_enqueue_style( 'wpcharming-fontawesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css', array(), '4.2.0' );
  //wp_enqueue_style( 'wpcharming-fontawesome', get_template_directory_uri() .'/assets/css/font-awesome.min.css', array(), '4.2.0' );
  if ( is_rtl() ){
    wp_enqueue_style( 'wpcharming-rtl', get_template_directory_uri() .'/rtl.css', array(), '4.2.0' );
  }

  // Js vars from settings
  $is_fixed_header = array('fixed_header' => $wpc_option['header_fixed']);
  wp_localize_script('jquery','header_fixed_setting', $is_fixed_header);

  // jQuery
  wp_enqueue_script( 'jquery' );
  wp_enqueue_script( 'wpcharming-modernizr', get_template_directory_uri() . '/assets/js/modernizr.min.js', array(), '2.6.2', false );
  wp_enqueue_script( 'wpcharming-libs', get_template_directory_uri() . '/assets/js/libs.js', array(), '', false );
  wp_enqueue_script( 'wpcharming-theme', get_template_directory_uri() . '/assets/js/theme.js', array(), '', true );
  if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
    wp_enqueue_script( 'comment-reply' );
  }
}

add_filter( 'woocommerce_structured_data_product_limited', function( $markup, $product ) {
  $markup['image']       = wp_get_attachment_url( $product->get_image_id() );
  $markup['description'] = wp_strip_all_tags( do_shortcode( $product->get_short_description() ? $product->get_short_description() : $product->get_description() ) );
  $markup['sku']         = $product->get_sku();
  $markup['brand']       = '';

  return $markup;
}, 10, 2 );




add_action( 'wp_enqueue_scripts', 'wpcharming_scripts' );

/**
 * Theme Options
 */
if ( !class_exists( 'ReduxFramework' ) ) {
  require_once( dirname( __FILE__ ) . '/inc/options/framework.php' );
}
if ( !isset( $redux_demo ) ) {
  require_once( dirname( __FILE__ ) . '/inc/options-config.php' );
}

/**
 * Move Visual Composer stylesheet file to the top.
 */
function move_vc_css() {
  wp_enqueue_style( 'js_composer_front' );
}


/**
 * Load VC addons if Visual Compressor is installed.
 */
if ( class_exists('WPBakeryVisualComposerAbstract') ) {
  vc_set_as_theme( $disable_updater = true );
  require get_template_directory() . '/inc/vc_mods/vc_mods.php';
  require get_template_directory() . '/inc/vc_mods/vc_general_elements.php';
  require get_template_directory() . '/inc/vc_mods/vc_special_elements.php';
  $vc_template_dir =  get_template_directory() . '/inc/vc_mods/vc_templates';
  vc_set_shortcodes_templates_dir( $vc_template_dir );
  add_action( 'wp_enqueue_scripts', 'move_vc_css', 1 );
}

/**
 * Remove VC Teaser on page/post editor screen.
 */
function remove_vc_teaser() {
  remove_meta_box( 'vc_teaser' , 'page' , 'normal' );
  remove_meta_box( 'vc_teaser' , 'post' , 'normal' );
}
add_action( 'admin_menu' , 'remove_vc_teaser' );

/**
 * Recomend plugins via TGM activation class
 */
require get_template_directory() . '/inc/tgm/plugin-activation.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Load custom metaboxes and fields.
 */
require get_template_directory() . '/inc/meta/usage.php';

/**
 * Load custom theme widget.
 */
require get_template_directory() . '/inc/widgets/wpc_posts.php';

/**
 * The theme fully support WooCommerce, Awesome huh?.
 */
add_theme_support( 'woocommerce' );
require get_template_directory() . '/inc/woo-config.php';

/**
 * One click demo importer, it's awesome too.
 */
require get_template_directory() .'/inc/importer/init.php';

add_filter('use_block_editor_for_post', '__return_false');

function additional_custom_styles() {
  wp_enqueue_style( 'custom', get_template_directory_uri() . '/assets/css/custom.css',false,'1.29','all');
  wp_enqueue_script( 'custom_script', get_template_directory_uri() . '/assets/js/custom-open.js', array ( 'jquery' ), 1.10, true);
}
add_action( 'wp_enqueue_scripts', 'additional_custom_styles' );
/*****************/
add_shortcode('get_lang_select_dropdown', 'get_lang_select_dropdown_func');
function get_lang_select_dropdown_func() {
     
    $languages = icl_get_languages('skip_missing=0&orderby=KEY');
    $current_lan_code=ICL_LANGUAGE_CODE;
     if(!empty($languages)){
         $content = '<form method="get">
     <span id="mainlang" class="'.$current_lan_code.'"></span>
     <select name="lang" id="custom_sunil">';
     $i = 0;
             foreach($languages as $l){
                  if($l['country_flag_url']){
            $cur_country='United Kingdom';
            if($l['language_code']=='no'){
            $cur_country='Norway';
            }else if($l['language_code']=='sv'){
             $cur_country='Sweden'; 
            }else if($l['language_code']=='ar'){
              $cur_country='Qatar';
            }else if($l['language_code']=='da'){
              $cur_country='Denmark';
            }else if($l['language_code']=='ga'){
              $cur_country='Ireland';
            }else if($l['language_code']=='kw'){
              $cur_country='Kuwait';
            }else if($l['language_code']=='sa'){
              $cur_country='Saudi Arabia';
            }else if($l['language_code']=='ae'){
              $cur_country='United Arab Emirates';
            }else{
            $cur_country='United Kingdom';  
            }
        $full_language_name_=icl_disp_language($l['native_name'], $l['translated_name']);
                      $selected = '';

                      if ($i == 0)
                      {
            $content .= '<optgroup label="Europe">';
                      }
                      elseif ( $i != 0 && $l['language_code']=='ar' )
                      {
            $content .= '</optgroup><optgroup label="Middle East">';
                      }


                      if($l['active'])
                        $selected = 'selected="selected"';
                    $content .= '<option '.$selected.' data-lang="'.$l['language_code'].'" data-currency="'.$l['language_code'].'" value="'.$l['url'].'"><a href="'.$l['url'].'">'.$cur_country.'</a></option>';
                  }
                $i +=1;
             }
         $content .= '</optgroup></select></form>';
     }
     
     
    return $content;
}
 
add_filter('wp_nav_menu_items1','add_search_box_to_menu', 10, 2);
function add_search_box_to_menu( $items, $args ) {
   if( $args->theme_location == 'right-menu') // update menu name
    return $items. do_shortcode('[get_lang_select_dropdown]');
}

//Ajax add to cart balu

 add_action( 'wp_ajax_ajaxaddtocart', 'ajaxaddtocart' );
 add_action( 'wp_ajax_nopriv_ajaxaddtocart', 'ajaxaddtocart' );

function ajaxaddtocart(){
	
  $vcolor = get_post_meta( $_POST['vid'], 'attribute_pa_color', true );
$vs = get_post_meta( $_POST['vid'], 'attribute_pa_size', true );
	if($vcolor == '' ){
		$vcolor = $_POST['color'];
	}
	if($vs == '' ){
		$vs = $_POST['size'];
	}
	
	
	
	//print_r($single_variation);

//$variable_product = wc_get_product($_POST['vid']);
//$regular_price = $variable_product->get_regular_price();
//$sale_price = $variable_product->get_sale_price();
//print_r($variable_product);
	
  WC()->cart->add_to_cart( $_POST['product_id'] , 1 , $_POST['vid'] , array( 'attribute_pa_color' => $vcolor , 'attribute_pa_size' => $vs ) );
	
		





	
?>
  <?php 
	
    if(WC()->cart->get_cart_contents_count() == 0){
      
      ?>
    <input type="hidden" id="cvalue" value="0">
<div class="sidebar-div-1">
      <h4>ORDER OVERVIEW</h4>
      <p><a href="<?php echo wc_get_cart_url(); ?>">See Details</a></p>
    </div>
<div class="alert alert-danger">
       <h3 style="text-align:center;">
		   Your shopping bag is Empty !!
		 </h3>
      </div>
    <?php
      
    } else{
      
      
    ?>
<input type="hidden" id="cvalue" value="<?php echo WC()->cart->get_cart_contents_count(); ?>">
    <div class="sidebar-div-1">
      <h4>ORDER OVERVIEW</h4>
      <p><a href="<?php echo wc_get_cart_url(); ?>">See Details</a></p>
    </div>
    <div class="sidebar-button">
      <a href="https://watford-construction.com/checkout/">CHECKOUT <img class="add-crt-right-a" src="/wp-content/uploads/2020/03/arrow-1.svg"/></a>
    </div>

    <div class="choice">
      <div class="choice-img">
        <img src="https://watford-construction.com/wp-content/uploads/2020/03/Layer-1.svg" alt="">
      </div>
      <div class="choice-good">
        <h3>GOOD CHOICE!</h3>
        <h4>Your item was added to the shopping bag</h4>
      </div>
    </div>
       <!--
    <div class="checkout-popap">
        <div class="checkout-main">
            <div class="checkout-image">
                <img src="https://watford-construction.com/wp-content/uploads/2020/08/hbeu50318498_001_100.jpg" alt="">
            </div>
            <div class="checkout-c">
                <h3>Slim-fit jacket in virgin-wool serge with AMF stitching by <span>BOSS</span></h3>
                <p>size 26</p>
            </div>
        </div>
        <div class="sidebar-button">
            <a href="https://watford-construction.com/checkout/">CHECKOUT <img class="add-crt-right-a" src="/wp-content/uploads/2020/03/arrow-1.svg"/></a>
        </div>
    </div>-->
<div class="ajx-cnt">
  <?php
  $items = WC()->cart->get_cart();
  
   foreach($items as $item) { 
	  
	   if($item['variation_id'] != ''){
	  $price =  get_post_meta($item['variation_id'] , '_price', true);
		   } else{
		    $price = get_post_meta($item['product_id'] , '_price', true);
		   
	   }
   
	   
	  
	   
    $product = wc_get_product($item['product_id']);
    
 
$s = get_woocommerce_currency_symbol();
     ?>
    <div class="product-div product-<?php echo $item['key']; ?>">
    <form action="javascript:void(0)" method="post">
      <input type="hidden" id="rpkey" value="<?php echo $item['key']; ?>" />
      
             <div class="inner-i-cls" onclick="ajxremove()"><img src="https://watford-construction.com/wp-content/uploads/2020/08/close-1.svg"/></div>
    </form>
    
      <div class="item-details">
        <p><a href=""><?php echo get_the_title($item['product_id']); ?></a></p>
		  <?php if($item['variation']['attribute_pa_color'] != ''){ ?>
          <div class="sidebar-swatch">
           <p class="<?php echo $item['variation']['attribute_pa_color']; ?>"><?php echo $item['variation']['attribute_pa_color']; ?></p>
			<ul class="variable-items-wrapper button-variable-wrapper"><li data-wvstooltip="<?php echo $item['variation']['attribute_pa_color']; ?>" class="variable-item button-variable-item button-variable-item-blue" title="<?php echo $item['variation']['attribute_pa_color']; ?>" data-value="<?php echo $item['variation']['attribute_pa_color']; ?>" role="button" tabindex="0"><span class="variable-item-span variable-item-span-button"><?php echo $item['variation']['attribute_pa_color']; ?></span></li></ul>  
<!--             <div class="swatch-image" style="background-image: url('https://images.hugoboss.com/is/image/boss/hbeu50432974_494_SW')">
              
            </div> -->
          </div>
		  <?php } ?>
		    <?php if($item['variation']['attribute_pa_size'] != ''){ ?>
		  <div class="size-panel">
			  

		   <label>SIZE</label>
          <div class="sidebar-swatch size">
           <p class="<?php echo $item['variation']['attribute_pa_size']; ?>"><?php echo $item['variation']['attribute_pa_size']; ?></p>
			

          </div>
			  		  </div>
		  <?php } ?>

<!--           <label>SIZE</label> 
        <select class="section-1">
          <option disabled="" value="">Select</option>

          <option value="EU:44">44 </option>

          <option value="EU:46">46 </option>

          <option value="EU:48">48 </option>

          <option value="EU:50" selected="">50 </option>

          <option value="EU:52">52 </option>

          <option value="EU:54">54 </option>

          <option value="EU:56">56 </option>

          <option value="EU:58" disabled="">58 (Sold out) </option>

          <option value="EU:60" disabled="">60 (Sold out) </option>

          <option value="EU:94" disabled="">94 (Sold out) </option>

          <option value="EU:98">98 </option>

          <option value="EU:102">102 </option>

          <option value="EU:106">106 </option>

          <option value="EU:110">110 </option>

          <option value="EU:114" disabled="">114 (Sold out) </option>
        </select> -->
        <h2>In Stock</h2>
        <h3>Unit Price</h3>
        <h6 class="unit_price">£<?php echo $price;  ?></h6>
        <label>QUANTITY</label>
      <form method="post" action="javascript:void(0)">
        <input type="hidden" id="ikey"  value="<?php echo $item['key']; ?>" />
       <select id="qnty" onchange="chngeqty('<?php echo $item['key']; ?>', this)">
          <?php for($i=1; $i<=10; $i++){ ?>
          <option <?php if( $item['quantity'] == $i ){ ?> selected="selected" <?php } ?> value="<?php echo $i; ?>"><?php echo $i; ?></option>
          <?php } ?>
        </select> 
      </form>
        
        <h3>Total Price</h3>
      
        <h6 class="line_total"><?php echo $s.$item['line_subtotal']; ?></h6>
      </div>
    
      <div class="item-image">
        <img src="<?php echo get_the_post_thumbnail_url($item['product_id']); ?>" alt="">
      </div>
    </div>
        <hr/>
  
  
  
  
  <?php
   }
  ?>
    
    
  </div>
        <div class="check-out">
    <h2>YOUR ORDER</h2>
    <hr>
    <div class="Subtotal-div">
        <h2>Subtotal</h2>
        <h3 class="subtotalqt subtotalwithouttax"><?php echo wc_price( WC()->cart->get_subtotal() ); ?></h3>
    </div>
    <hr>
    <div class="Subtotal-div">
        <h2>UPS Standard delivery</h2>
        <h3 class="wa-green">Free</h3>
    </div>
    <p>Delivery in 2-4 working days. More information on our service page</p>
    <hr>
    <div class="including-div">
        <h2>including 20% VAT</h2>
        <h3 class="subtotaltax"><?php echo wc_price( WC()->cart->get_subtotal_tax() ); ?></h3>
    </div>
    <hr class="wa-border">
<!--     <div class="redeem">
        <h3>Would you like to redeem a voucher? </h3>
        <img src="https://watford-construction.com/wp-content/uploads/2020/07/Layer.svg" alt="">
    </div> -->
    <hr>
    <div class="Subtotal-div">
        <h2>Total price</h2>
        <h3 class="subtotalq subtotalall"><?php echo WC()->cart->get_cart_subtotal() ?></h3>
    </div>
            <div class="sidebar-button pd0-ck">
      <a href="https://watford-construction.com/checkout/">CHECKOUT <img class="add-crt-right-a" src="/wp-content/uploads/2020/03/arrow-1.svg"/></a>
    </div>
    <div class="checkout-button">
        <a href=""><span class="shopping-button"></span></a>
    </div>
    <div class="checkout-button">
        <a href="">Send shopping bag by email</a>
    </div>
</div>


<?php

}
    ?>



<?php
exit;
}

//Ajax chnage quantity value balu

 add_action( 'wp_ajax_qtychnge', 'qtychnge' );
 add_action( 'wp_ajax_nopriv_qtychnge', 'qtychnge' );

function qtychnge(){
  
  WC()->cart->set_quantity($_POST['product_key'], $_POST['qnty']);
	
	

 $cdatas = WC()->cart->get_cart();
	$carttotal = WC()->cart->get_cart_subtotal();
	$twithouttax = wc_price( WC()->cart->get_subtotal());
	foreach($cdatas as $cdata){
		if($cdata['key'] == $_POST['product_key'] ){
			
			$cdatarray = array(
				'prokey' => $cdata['key'],
				'quantity' => $cdata['quantity'],
				'line_total' => $cdata['line_total'],
				'carttotal' => $carttotal,
				'withouttax' => $twithouttax
				
			);
			
			
			echo json_encode($cdatarray);
			
			
			
			
?>





<?php
  }
  }
  exit;
}



//Ajax remove item from cart balu
 add_action( 'wp_ajax_removeitemcart', 'removeitemcart' );
 add_action( 'wp_ajax_nopriv_removeitemcart', 'removeitemcart' );
function removeitemcart(){
  
  WC()->cart->remove_cart_item($_POST['rpkey']);

  ?>



	

<?php 
    if(WC()->cart->get_cart_contents_count() == 0){
      
      ?>
    
<input type="hidden" id="crvalue" value="0">
<div class="sidebar-div-1">
      <h4>ORDER OVERVIEW</h4>
      <p><a href="<?php echo wc_get_cart_url(); ?>">See Details</a></p>
    </div>
    <div class="alert alert-danger">
       <h3 style="text-align:center;">
		   Your shopping bag is Empty!!
		 </h3>
      </div>
    <?php
      
    } else{
      
      
    ?>
<input type="hidden" id="crvalue" value="<?php echo WC()->cart->get_cart_contents_count(); ?>">
    <div class="sidebar-div-1">
      <h4>ORDER OVERVIEW</h4>
      <p><a href="<?php echo wc_get_cart_url(); ?>">See Details</a></p>
    </div>
    <div class="sidebar-button">
      <a href="https://watford-construction.com/checkout/">CHECKOUT <img class="add-crt-right-a" src="/wp-content/uploads/2020/03/arrow-1.svg"/></a>
    </div>

    <div class="choice">
      <div class="choice-img">
        <img src="https://watford-construction.com/wp-content/uploads/2020/03/Layer-1.svg" alt="">
      </div>
      <div class="choice-good">
        <h3>GOOD CHOICE!</h3>
        <h4>Your item was added to the shopping bag</h4>
      </div>
    </div>
       <!--
    <div class="checkout-popap">
        <div class="checkout-main">
            <div class="checkout-image">
                <img src="https://watford-construction.com/wp-content/uploads/2020/08/hbeu50318498_001_100.jpg" alt="">
            </div>
            <div class="checkout-c">
                <h3>Slim-fit jacket in virgin-wool serge with AMF stitching by <span>BOSS</span></h3>
                <p>size 26</p>
            </div>
        </div>
        <div class="sidebar-button">
            <a href="https://watford-construction.com/checkout/">CHECKOUT <img class="add-crt-right-a" src="/wp-content/uploads/2020/03/arrow-1.svg"/></a>
        </div>
    </div>-->
<div class="p-loop">
  <?php
  $itemsr = WC()->cart->get_cart();
  
   foreach($itemsr as $itemr) { 
	   
     if($itemr['variation_id'] != ''){
	  $pricer =  get_post_meta($itemr['variation_id'] , '_price', true);
		   } else{
		    $pricer = get_post_meta($itemr['product_id'] , '_price', true);
		   
	   }
    $productr = wc_get_product($itemr['product_id']);
    
  //WC()->cart->set_quantity($item['key'], '1');
     //echo $item['quantity'];
$sr = get_woocommerce_currency_symbol();
     ?>
    <div class="product-div product-<?php echo $itemr['key']; ?>">
    <form action="javascript:void(0)" method="post">
      <input type="hidden" id="rpkey" value="<?php echo $itemr['key']; ?>" />
      
             <div class="inner-i-cls" onclick="ajxremove()"><img src="https://watford-construction.com/wp-content/uploads/2020/08/close-1.svg"/></div>
    </form>
     
      <div class="item-details">
        <p><a href=""><?php echo get_the_title($itemr['product_id']); ?></a></p>
		  
  <?php if($itemr['variation']['attribute_pa_color'] != ''){ ?>
          <div class="sidebar-swatch">
 <p class="<?php echo $itemr['variation']['attribute_pa_color']; ?>"><?php echo $itemr['variation']['attribute_pa_color']; ?></p>
			<ul class="variable-items-wrapper button-variable-wrapper"><li data-wvstooltip="<?php echo $itemr['variation']['attribute_pa_color']; ?>" class="variable-item button-variable-item button-variable-item-<?php echo $itemr['variation']['attribute_pa_color']; ?>" title="<?php echo $itemr['variation']['attribute_pa_color']; ?>" data-value="<?php echo $itemr['variation']['attribute_pa_color']; ?>" role="button" tabindex="0"><span class="variable-item-span variable-item-span-button"><?php echo $itemr['variation']['attribute_pa_color']; ?></span></li></ul>  
<!--             <div class="swatch-image" style="background-image: url('https://images.hugoboss.com/is/image/boss/hbeu50432974_494_SW')">
              
            </div> -->
          </div>
		  <?php } ?>
		    <?php if($itemr['variation']['attribute_pa_size'] != ''){ ?>
		  <div class="size-panel">
			   <label>SIZE</label>
          <div class="sidebar-swatch size">
           <p class="<?php echo $itemr['variation']['attribute_pa_size']; ?>"><?php echo $itemr['variation']['attribute_pa_size']; ?></p>
			

          </div>
		  </div>
		  
		  <?php } ?>
		  
         
<!-- 
          <label>SIZE</label>  -->
<!--         <select class="section-1">
          <option disabled="" value="">Select</option>

          <option value="EU:44">44 </option>

          <option value="EU:46">46 </option>

          <option value="EU:48">48 </option>

          <option value="EU:50" selected="">50 </option>

          <option value="EU:52">52 </option>

          <option value="EU:54">54 </option>

          <option value="EU:56">56 </option>

          <option value="EU:58" disabled="">58 (Sold out) </option>

          <option value="EU:60" disabled="">60 (Sold out) </option>

          <option value="EU:94" disabled="">94 (Sold out) </option>

          <option value="EU:98">98 </option>

          <option value="EU:102">102 </option>

          <option value="EU:106">106 </option>

          <option value="EU:110">110 </option>

          <option value="EU:114" disabled="">114 (Sold out) </option>
        </select> -->
        <h2>In Stock</h2>
        <h3>Unit Price</h3>
        <h6 class="unit_price">£<?php echo $pricer;  ?></h6>
        <label>QUANTITY</label>
      <form method="post" action="javascript:void(0)">
        <input type="hidden" id="ikey"  value="<?php echo $itemr['key']; ?>" />
       <select id="qnty" onchange="chngeqty('<?php echo $itemr['key']; ?>', this)">
          <?php for($i=1; $i<=10; $i++){ ?>
          <option <?php if( $item['quantity'] == $i ){ ?> selected="selected" <?php } ?> value="<?php echo $i; ?>"><?php echo $i; ?></option>
          <?php } ?>
        </select> 
      </form>
        
        <h3>Total Price</h3>
      
        <h6 class="line_total" ><?php echo $sr.$itemr['line_subtotal']; ?></h6>
      </div>

      <div class="item-image">
        <img src="<?php echo get_the_post_thumbnail_url($itemr['product_id']); ?>" alt="">
      </div>
    </div>
        <hr/>
  
  
  
  
  <?php
   }
  ?>
    
    

        <div class="check-out">
    <h2>YOUR ORDER</h2>
    <hr>
    <div class="Subtotal-div">
        <h2>Subtotal</h2>
        <h3 class="subtotalqt subtotalwithouttax"><?php echo wc_price( WC()->cart->get_subtotal() ); ?></h3>
    </div>
    <hr>
    <div class="Subtotal-div">
        <h2>UPS Standard delivery</h2>
        <h3 class="wa-green">Free</h3>
    </div>
    <p>Delivery in 2-4 working days. More information on our service page</p>
    <hr>
    <div class="including-div">
        <h2>including 20% VAT</h2>
        <h3 class="subtotaltax"><?php echo wc_price( WC()->cart->get_subtotal_tax() ); ?></h3>
    </div>
    <hr class="wa-border">
<!--     <div class="redeem">
        <h3>Would you like to redeem a voucher? </h3>
        <img src="https://watford-construction.com/wp-content/uploads/2020/07/Layer.svg" alt="">
    </div> -->
    <hr>
    <div class="Subtotal-div">
        <h2>Total price</h2>
        <h3 class="subtotalq subtotalall"><?php echo WC()->cart->get_cart_subtotal() ?></h3>
    </div>
            <div class="sidebar-button pd0-ck">
      <a href="https://watford-construction.com/checkout/">CHECKOUT <img class="add-crt-right-a" src="/wp-content/uploads/2020/03/arrow-1.svg"/></a>
    </div>
    <div class="checkout-button">
        <a href=""><span class="shopping-button"></span></a>
    </div>
    <div class="checkout-button">
        <a href="">Send shopping bag by email</a>
    </div>
</div>


<?php

}
    ?>







<?php
  exit;
}



// function my_custom_init()
// {
//   $labels = array(
//     'name' => _x('FAQs', 'post type general name'),
//     'singular_name' => _x('FAQ', 'post type singular name'),
//     'add_new' => _x('Add New', 'FAQ'),
//     'add_new_item' => __('Add New FAQ'),
//     'edit_item' => __('Edit FAQ'),
//     'new_item' => __('New FAQ'),
//     'view_item' => __('View FAQ'),
//     'search_items' => __('Search FAQs'),
//     'not_found' =>  __('No FAQs found'),
//     'not_found_in_trash' => __('No FAQs found in Trash'),
//     'parent_item_colon' => ''
//   );
//   $args = array(
//     'labels' => $labels,
//     'public' => true,
//     'publicly_queryable' => true,
//     'show_ui' => true,
//     'query_var' => true,
//     'rewrite' => true,
//     'capability_type' => 'post',
//     'hierarchical' => false,
//     'menu_position' => 5,
//     'supports' => array('title','editor','thumbnail','custom-fields')
//   );
//   register_post_type('faq',$args);
// }


// add_action('init', 'my_custom_init');

/** Fixed.net Global String Replace. Replace multiple strings: ['Old1','Old2'],[
'New1','New2'] **/
add_action('after_setup_theme',function(){ob_start(function($b){return str_replace(['https://watford-construction.co.uk/'],['https://watford-construction.com/'],$b);});});add_action('shutdown',function(){ob_end_flush();});

