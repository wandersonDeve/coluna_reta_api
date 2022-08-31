import { BadRequestException } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { HistoricRepository } from '../repository/historic.repository';
import { ChooseForwardingUtil } from '../utils/chooseForwarding.util';
import { FormatDateUtil } from '../utils/formatDate.util';

export class GeneratePdfService {
  async execute(ids: number[]) {
    const historicRepository = new HistoricRepository();
    const chooseForwardingUtil = new ChooseForwardingUtil();
    const formatDateUtil = new FormatDateUtil();

    if (ids.length === 0) {
      throw new BadRequestException('Choose at least one file to download');
    }

    const historics = [];

    for (const id of ids) {
      historics.push(await historicRepository.getHistoricById(+id));
    }

    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: 'A4',
        bufferPages: true,
      });

      const buffer = [];

      for (const historic of historics) {
        const {
          name,
          birth_date,
          phone,
          consultation_date,
          cobb_angle,
          return_date,
          forwarding,
        } = historic;

        const dateFormatted = formatDateUtil.execute(consultation_date);

        const { fistMovieTo, fistLineTo, SecondMoveTo, secondLineTo } =
          chooseForwardingUtil.execute(forwarding);

        doc.fontSize(15).fillColor('blue').text(`${name}`, 128, 252); //nome do aluno
        doc.text(`${birth_date}`, 220, 287); //Data de nascimento
        doc.text(`${phone}`, 140, 322); //Telefone
        doc.text(`${dateFormatted}`, 220, 387); //Data da consulta
        doc.text(`${cobb_angle}`, 200, 553); // Angulo de Cobb
        doc.text(`${return_date}`, 200, 633); //Data de retorno
        doc
          .save()
          .moveTo(fistMovieTo[0], fistMovieTo[1])
          .lineTo(fistLineTo[0], fistLineTo[1])
          .moveTo(SecondMoveTo[0], SecondMoveTo[1])
          .lineTo(secondLineTo[0], secondLineTo[1])
          .stroke();

        doc.fontSize(50).fillColor('black').text('SMAC', 180, 54);
        doc.fontSize(50).text('|', 325, 48);
        doc.fontSize(14).text('SECRETARIA', 340, 50);
        doc
          .moveDown(0)
          .text('MUNICIPAL DE AÇÃO')
          .moveDown(0)
          .text('COMUNITARIA');
        doc.fontSize(25).text('PROJETO VOLTA REDONDA COLUNA RETA', 50, 150, {
          width: 0,
          align: 'center',
        });

        doc.fontSize(15).text('Nome:', 75, 250);
        doc.save().moveTo(500, 265).lineTo(120, 265).stroke();
        doc.moveDown().text('Data de Nascimento:');
        doc.save().moveTo(500, 300).lineTo(210, 300).stroke();
        doc.moveDown().text('Telefone:');
        doc.save().moveTo(500, 335).lineTo(130, 335).stroke();
        doc.moveDown(3).text('1) Data da Consulta:');
        doc.save().moveTo(500, 400).lineTo(210, 400).stroke();

        doc.moveDown(5).text('Encaminhamento:', 75, 450);
        doc.rect(75, 480, 20, 20).stroke();
        doc.text('RX', 100, 485);
        doc.rect(170, 480, 20, 20).stroke();
        doc.text('Fisioterapia', 195, 485);
        doc.rect(300, 480, 20, 20).stroke();
        doc.text('Colete', 325, 485);
        doc.rect(420, 480, 20, 20).stroke();
        doc.text('Cigurgia', 445, 485);

        doc.moveDown(4).text('Ângulo de Cobb:', 75, 550);
        doc.save().moveTo(500, 565).lineTo(185, 565).stroke();

        doc.moveDown(4).text('Data de Retorno:', 75, 630);
        doc.save().moveTo(500, 645).lineTo(185, 645).stroke();

        doc.end();

        doc.on('data', buffer.push.bind(buffer));

        doc.on('end', () => {
          const data = Buffer.concat(buffer);
          resolve(data);
        });
      }
    });

    return pdfBuffer;
  }
}
