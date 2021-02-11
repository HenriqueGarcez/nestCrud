import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { BlingClient } from '@sthima/bling';
import {
  OrigemItem,
  Pedido,
  TipoItem,
  TipoPessoa,
  UnidadeItem
} from '@sthima/bling/dist/types/createInvoice';
import { js2xml } from 'xml-js';
import { api } from '../utils/api';

const blingClient = new BlingClient(
  '12ca4d019c566da3b74771222504d73e98bd82b0c89190cbc30d6bfe85bebea5dd5d5fc3'
);

@Injectable()
export class InvoicesService {
  public async listAllInvoices() {
    try {
      const params: { [key: string]: string } = { apikey: '12ca4d019c566da3b74771222504d73e98bd82b0c89190cbc30d6bfe85bebea5dd5d5fc3' };
      const response = await api.get(`notafiscal/011686/3/json`, {
        params,
      });
      return response.data.retorno.notasfiscais.shift();
      // return blingClient.buscarNotaFiscal('011686', '1');
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  public async generateInvoice() {
    const pedido = <Pedido>{
      pedido: {
        cliente: {
          nome: 'User nome',
          tipo_pessoa: TipoPessoa.Fisica,
          cpf_cnpj: '68474683866',
          endereco: 'Rua street 3',
          numero: '456',
          complemento: '',
          bairro: 'Centro',
          cep: '990010060',
          cidade: 'Passo Fundo',
          uf: 'RS',
          fone: '',
          email: 'invoicer@sthima.com.br'
        },
        itens: [
          {
            item: {
              codigo: '111',
              class_fiscal: '49029000',
              un: UnidadeItem.Unidade,
              tipo: TipoItem.Produto,
              origem: OrigemItem.Nacional,
              descricao: 'Plano Teste 5',
              vlr_unit: '80',
              qtde: '1'
            }
          }
        ]
      }
    };

    const params: { [key: string]: string } = {
      xml: js2xml(pedido, { compact: true, spaces: 4 }),
    };

    Logger.log(params);

    const { notaFiscal } = await blingClient.criarNotaFiscal(pedido);

    Logger.log(notaFiscal);

    const notaCompleta = await blingClient.buscarNotaFiscal(
      notaFiscal.numero,
      notaFiscal.serie
    );
    return notaCompleta;
  }

  public scheduleJob(): Promise<any> {
    Logger.log('Schedule it');
    return Promise.resolve();
  }

  private async validatePedido(pedido: Pedido) {
    try {
      return pedido as Pedido;
    } catch (err) {
      throw err;
    }
  }
}
