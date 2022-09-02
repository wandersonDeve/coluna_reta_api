import * as pdf from 'html-pdf';
import ejs from 'ejs';
import { HistoricRepository } from '../repository/historic.repository';
import { BadRequestException } from '@nestjs/common';
import { FormatDateUtil } from '../utils/formatDate.util';

export class GeneratePdfFileService {
  async execute(ids: Array<number>) {
    const historicRepository = new HistoricRepository();
    const formatDateUtil = new FormatDateUtil();

    if (ids.length === 0) {
      throw new BadRequestException('Choose at least one file to download');
    }

    const historics = [];

    for (const id of ids) {
      historics.push(await historicRepository.getHistoricById(+id));
    }

    if (historics.length === 0) {
      throw new BadRequestException('This students has no archives available');
    }

    for (const archives of historics) {
      const {
        name,
        birth_date,
        phone,
        institution_name,
        city,
        state,
        zip_code,
        institution_phone,
        forwarding,
        cobb_angle,
        return_date,
        visit_date,
        image_1,
        image_2,
      } = archives;

      const newDateFormatted = formatDateUtil.execute(visit_date);

      ejs.renderFile(
        './template.ejs',
        {
          name: name,
          birth_date: birth_date,
          phone: phone,
          institution_name: institution_name,
          city: city,
          state: state,
          zip_code: zip_code,
          institution_phone: institution_phone,
        },
        (err, result) => {
          if (err) {
            console.log(err);
          }

          pdf
            .create(result, {})
            .toFile(`../pdf/${Date.now()}.pdf`, (err, res) => {
              if (err) {
                console.log(err);
              }

              return res;
            });
        },
      );
    }
  }
}
