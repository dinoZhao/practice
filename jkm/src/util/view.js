import Viewer from 'v-viewer'
import 'static/css/viewer.css'
import Vue from 'vue'
 Vue.use(Viewer);
export default{
		created(){
			var vm=this
		Viewer.setDefaults({
			Options:{//预览插件配置
				"inline": true, "button": true, "navbar": false, "title": false, "toolbar": false, "tooltip": false,
				"movable": false, "zoomable": true, "rotatable": false, "scalable": false, "transition": true, 
				"fullscreen": true, "keyboard": false, "url": "data-source"
  		       },
		});
	}
}
