import Vue from 'vue'
import { quillEditor} from 'vue-quill-editor';
//import Quill from 'quill'
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

import VQuill from 'quill'
const Quill = window.Quill || VQuill

import { ImageDrop } from 'quill-image-drop-module'
//import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageDrop', ImageDrop)
//Quill.register('modules/imageResize', ImageResize)



// if (process.browser) {
//     const VueQuillEditor = require('vue-quill-editor/ssr')
//     Quill.register('modules/imageResize', ImageResize)
//     Vue.use(VueQuillEditor)
//   }
 Vue.use(VueQuillEditor)

