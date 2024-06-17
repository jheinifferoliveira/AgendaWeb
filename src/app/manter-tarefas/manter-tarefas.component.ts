import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-manter-tarefas',
  standalone: true,
  imports: [  FormsModule,
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './manter-tarefas.component.html',
  styleUrl: './manter-tarefas.component.css'
})
export class ManterTarefasComponent {

  endpoint: string = 'http://localhost:5058/api/tarefas/';

  tarefas : any[] = [];

  mensagemCadastro : string = '';
  
  formConsulta = new FormGroup({
    dataInicio : new FormControl('', [Validators.required]), 
    dataFim : new FormControl('', [Validators.required])
  });

  formCadastro = new FormGroup({
    nome : new FormControl('',[Validators.required, Validators.minLength(8), Validators.maxLength(100)]),
    descricao : new FormControl('',[Validators.required, Validators.minLength(8), Validators.maxLength(100)]),
    dataHora : new FormControl('',[Validators.required]),
    prioridade : new FormControl('',[Validators.required])
  });

  formEdicao = new FormGroup({
    id: new FormControl(''),
    nome : new FormControl('',[Validators.required, Validators.minLength(8), Validators.maxLength(100)]),
    descricao : new FormControl('',[Validators.required, Validators.minLength(8), Validators.maxLength(100)]),
    dataHora : new FormControl('',[Validators.required]),
    prioridade : new FormControl('',[Validators.required])
  });


  get fConsulta(){
    return this.formConsulta.controls;
  }

  get fCadastro(){
    return this.formCadastro.controls;
  }

  get fEdicao(){
    return this.formEdicao.controls;
  }

  constructor(
    private httpClient : HttpClient
  ){}

  pesquisarTarefas(): void {
    const dataInicio=(this.formConsulta.value.dataInicio);
    const dataFim=(this.formConsulta.value.dataFim);

    this.httpClient
    .get(this.endpoint + dataInicio +"/"+ dataFim)
    .subscribe({
      next:(dados) => {
        this.tarefas = dados as any[];

      },
      error: (e) => {
        console.log(e.error);

      }


    });
  }

  cadastrarTarefa() : void{
    
    this.httpClient.post(this.endpoint, this.formCadastro.value)
    .subscribe({
      next:(data)=>{
        console.log(data);
        this.mensagemCadastro='Tarefa cadastrada com sucesso.';
        this.formCadastro.reset();
    },
    error: (e) => {
      console.log(e.error);
    }


  });
}

excluirTarefa(id:string):void{
  if(confirm('Deseja realmente excluir a tarefa?')){
    this.httpClient.delete(this.endpoint+id)
    .subscribe({
      next:(data: any)=>{
        alert('Tarefa excluída com sucesso.');
        this.pesquisarTarefas();

      },
      error: (e) => {
        console.log(e.error);
      }
    })
  }
}

obterTarefa(tarefa: any) : void {
  this.formEdicao.controls['id'].setValue(tarefa.id);
  this.formEdicao.controls['nome'].setValue(tarefa.nome);
  this.formEdicao.controls['dataHora'].setValue(tarefa.dataHora.substring(0,16));
  this.formEdicao.controls['descricao'].setValue(tarefa.descricao);
  this.formEdicao.controls['prioridade'].setValue(tarefa.prioridade);

}

editarTarefa(): void{

  this.httpClient.put(this.endpoint, this.formEdicao.value)
  .subscribe({
    next: (data) => {
      alert('Tarefa atualizada com sucesso.');
      this.pesquisarTarefas();

    },
    error: (e) =>{
      console.log(e.error)
    }
  })

}

}
