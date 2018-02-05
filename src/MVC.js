import { StyleSheet, Dimensions } from 'react-native';
let totalWidth = Dimensions.get('window').width;
let totalHeight = Dimensions.get('window').height;
let textSize = totalWidth / 18;
let readingUITitleHeight = textSize * 6;
let diaryBodyLine = totalHeight / textSize - 6;
let returnButtonHeight = textSize * 5;
let MCV = StyleSheet.create({
    container: { flex: 1,backgroundColor:'#30329B40'},
    LinearLayout: {backgroundColor:'#30329B40',flexDirection: 'column',},
    container_center: { flex: 1,justifyContent:'center',backgroundColor:'#30329B40',alignItems:'center'},
    firstRow: {           		//firstRow用来定义屏幕最上方显示按钮的View
        height:textSize *1.4 +2,    
        flexDirection: 'row',
        
        width:totalWidth - 4,           	// margin设置为2，两边加起来就是4，所以宽度要减4
        justifyContent: 'space-around',	//使用这个键值，可以看到这一行里的三个按钮不论
        margin:2                          	//屏幕宽度是多少都会乖乖地排列好，感觉还是很省心的
    },
    longButton: {                  //定义一个比较长的Text做按钮
        height: textSize *2,
        margin:10,
        backgroundColor: '#3e9ce9',
        color:'white',
        alignItems:'center',
        borderRadius: 8,   
        justifyContent: 'center',        //设置了圆角风络，在iPhone平台上显示正常，但在Android 
        textAlign:'center',       //手机上没有圆角风格，所以下面的Android手机运行截图
        fontSize: textSize        //中的按钮都是直角的。在真正商用开发时，还是尽量让美工
    },                               //出图，用Image做按钮
    middleButton: {               //长度适中的Text按钮样式
        height:textSize *1.4 ,
        backgroundColor: 'gray',
        width:textSize*5,
        borderRadius: 8,
        textAlign:'center',
        fontSize: textSize
    },
    diaryAbstractList: {    //这是日记列表界面用来实现假列表的View
        flex:1,    
        margin:4,
        width:totalWidth-4,
        justifyContent: 'center',
        backgroundColor:'grey'
    }, 
    diaryBodyStyle: {       //显示、输入日记正文的TextInput组件样式
        flex:1,
        width:totalWidth-8,  //读者可以试一试看不设置这个width的效果，并且注意在阅读
        fontSize:textSize,   //日记和写日记界面中，日记显示（输入框）的左右两边能否与上面的边对齐
        backgroundColor:'grey',
        margin:4
    },
    smallButton: {          //长度比较短的Text组件样式
        height:textSize *1.4 ,
        backgroundColor: 'gray',
        width:textSize*3,
        borderRadius: 8,
        textAlign:'center',
        fontSize: textSize
    },
    moodStyle: {           //显示记日记时心情的Image组件样式
        height:textSize*3.2,
        width:textSize*3.2,      
        borderRadius:textSize*1.6      
    },
    subViewInReader: {    //这个View用来在心情图片旁边显示日记的标题和时间
        width:totalWidth-5-textSize*3.2,
    },
    textInReader: {        //这是显示在心情图片旁边的标题和时间的Text组件样式
        height:textSize*1.4,     
        fontSize: textSize,
        //backgroundColor: 'grey',
        color:'#ffffff',    
        margin:5,
    },
    secondRow: {           //阅读日记界面用来展示心情图片、日记标题、日记时间的View
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'grey',
        borderRadius:4,
        margin:1
    },    
    TextInputStyle: {      //写日记界面用来输入日记标题的TextInput组件样式
        fontSize: textSize,

        height: textSize*2.4,
        color:'black',    
        margin: 4,
       
	    width: totalWidth -12,
         
    },
    searchBarTextInput: {   //搜索关键字输入框样式定义
        backgroundColor: 'white',
        borderColor: 'black', 
        height:textSize *1.4 ,   
        width: textSize*10,
        paddingTop: 0,        //如果不设置，在Android平台TextInput组件内输入显示异常
        paddingBottom: 0,     //如果不设置，在Android平台TextInput组件内输入显示异常        
        fontSize: 14,
    },
    sectionText: {   //搜索关键字输入框样式定义
        backgroundColor: 'white',
        borderColor: 'black', 
        height:textSize *1.4 ,   
        width: textSize*10,
        paddingTop: 0,        //如果不设置，在Android平台TextInput组件内输入显示异常
        paddingBottom: 0,     //如果不设置，在Android平台TextInput组件内输入显示异常        
        fontSize: 14,
    },
    textAddress: { 
        marginTop:20,
        height:textSize *1.1 ,   
        color:'#ffffff',
        fontSize: 14,
    
    },
    txtextAddress: { 
        marginTop:20,
        height:textSize *2 ,   
        color:'#ffffff',
        fontSize: 14,
    
    },
    section: {   //搜索关键字输入框样式定义
        backgroundColor: 'white', 
    },

    separator: {   //搜索关键字输入框样式定义
        height:textSize *1.4 , 
        width: totalWidth,
        backgroundColor: 'blue', 
    },
    webview:{
        height:0 ,   
        width: 0,
        padding:0
    }
});
export { MCV as default };