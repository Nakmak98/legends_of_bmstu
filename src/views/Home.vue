 <template>
  <div class="home">
    <img alt="Vue logo"  src="../assets/logo.png">
    <TaskEditor></TaskEditor>
  </div>

</template>

<script>
// @ is an alias to /src
// import Axios from 'axios'
import TaskEditor from "../components/TaskEditor";
export default {
  name: 'home',
  data: function(){
    return{}
  },
  components: {
    TaskEditor
  }

}

// function checkUser(){

// }
</script>
