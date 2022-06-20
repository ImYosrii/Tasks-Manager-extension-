// vars
let tasks = []
let dublicates = []
let task_name = document.querySelector('.task-name')
const popup = document.querySelector('.task-info')
const add_btn = document.querySelector('.add')
const remove_btn =  document.querySelector('.remove')
const submit_btn = document.querySelector('.submit')
let tasks_list = document.querySelector('.tasks-list')
const stored_tasks = JSON.parse(localStorage.getItem("myTasks"))
let task_cliked = false
let current_task=''

// check if there's tasks stored in local storage
if (stored_tasks){
    tasks = stored_tasks
    show_tasks(tasks)
}

// renders the taks to screen
function show_tasks(mytasks){
    for (let i in mytasks){       
        let task = tasks[i]
        if (!dublicates.includes(task)){
            tasks_list.innerHTML += `<li id="task" class="task-${i} tasks-css"><div class='task-name-css'>${task}</div></li>`
            dublicates.push(task)
        }
    }
}

// allow to detect clicks on tasks and delete them individually 
function active_selection(){
    document.querySelectorAll('#task').forEach(task=>{
            task.addEventListener('click',function(){
                if (task_cliked && current_task===task){
                    task_cliked=false
                    task.style.background='white'
                    remove_btn.style.color=''
                    remove_btn.style.cursor=''
                }
        
                else if(!task_cliked){
                    task_cliked=true
                    current_task=task
                    task.style.background='rgb(216, 214, 214)'
                    remove_btn.style.cursor='pointer'
                    remove_btn.style.color='red'
                    remove_btn.style.pointerEvents = 'auto'
                        remove_btn.addEventListener('click',function(){
                            let task_str = task.textContent
                            let task_index = tasks.indexOf(task_str)
                            if (task_index!=-1 && task_cliked && current_task===task){
                                console.log(task_str,task_index, tasks )
                                remove_btn.style.cursor=''
                                remove_btn.style.color=''
                                remove_btn.style.pointerEvents = 'none'
                                tasks.splice(task_index, 1)
                                dublicates.splice(task_index, 1)
                                localStorage.clear()
                                localStorage.setItem("myTasks", JSON.stringify(tasks))
                                task.style.display='none'
                                task_cliked=false

                            }
                            
                        })             
            }
        })
    })
}

// listens to click on add button and shows a popup
add_btn.addEventListener('click',function(){
    popup.style.display='block'
})

// adds the new task to screen by listening to ADD button 
submit_btn.addEventListener('click',function(){
    popup.style.display='none'
    if (!tasks.includes(task_name.value)){
        tasks.push(task_name.value) 
        localStorage.setItem("myTasks", JSON.stringify(tasks))
        task_name.value = ''
    }
    show_tasks(tasks)
    active_selection()
})


active_selection()
