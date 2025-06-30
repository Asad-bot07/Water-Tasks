document.addEventListener('DOMContentLoaded',()=>{
const seed=document.getElementById('createSeed');
const PopUPForm=document.getElementById('popUpForm');
const date=document.getElementById('DateInput');
const task=document.getElementById('TaskInput');
const alias=document.getElementById('taskAlias');
let seeds=JSON.parse(localStorage.getItem('seed'))||[];
seeds.forEach(seed => {
    createCard(seed.date, seed.alias, seed.task);
});
if (seeds.length > 0) {
  document.getElementById('body').classList.add('hidden');
}
seed.addEventListener('click',()=>{
    let tmp=document.getElementById('body');
    tmp.classList.add(
        'hidden'
    )
    PopUPForm.classList.remove(
        'hidden'
    )
    setTimeout(() => {
        PopUPForm.classList.remove('opacity-0', 'scale-90');
        PopUPForm.classList.add('opacity-100', 'scale-100');
    }, 10); 
});
const ClosePopUp=document.getElementById('closePopUp');
ClosePopUp.addEventListener('click',()=>{
    // if(date.value.trim()==='' && task.value.trim()==='' && alias.value.trim()==='')
    //     alert('Write smth')
    if(task.value=='' || alias.value=='' || date.value=='')
        alert('Fill the form properly')
    else{
        createCard(date.value,alias.value,task.value);
        const newSeed={
            date:date.value,
            task:task.value,
            alias:alias.value
        };
        seeds.push(newSeed);
        seedExamine();
        PopUPForm.classList.add('hidden');
    }
    task.value='';
    alias.value='';
    date.value='';
});
function seedExamine()
{
    localStorage.setItem('seed',JSON.stringify(seeds));
}
function createCard(date,alias,task){
    let card=document.createElement('div');
         card.classList.add(
    'bg-white',
    'rounded-lg',
    'shadow-md',
    'p-4',
    'text-left',
    'w-full',
    'transition-all',
    'duration-300',
    'hover:scale-105',
    'flex',
    'flex-col',
    'justify-between',
    'gap-2'
  );
    card.innerHTML = `
    <div>
      <h2 class="text-green-700 font-bold text-lg mb-1">🌱 ${alias}</h2>
      <p class="text-sm mb-1">🗓️ <strong>Date:</strong> ${date}</p>
      <p class="text-sm mb-2">📝 <strong>Task:</strong> ${task}</p>
    </div>
  `;
     const doneButton = document.createElement('button');
  doneButton.textContent = "🚿Water";
  doneButton.classList.add(
    'bg-blue-400',
    'text-white',
    'py-1',
    'px-3',
    'rounded-md',
    'hover:bg-blue-700',
    'self-end',
    'text-sm'
  );
    doneButton.addEventListener('click', (e) => {
        card.remove();
         seeds = seeds.filter(seed =>
        !(seed.date === date && seed.alias === alias && seed.task === task)
        );
        seedExamine();
  });
   card.appendChild(doneButton);
   document.getElementById('cardDiv').appendChild(card);
}
})