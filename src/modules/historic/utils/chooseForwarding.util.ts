export class ChooseForwardingUtil {
  execute(choice: string) {
    switch (choice) {
      case 'RX':
        return `doc
        .save()
        .moveTo(93, 498)
        .lineTo(76, 482)
        .moveTo(93, 482)
        .lineTo(76, 498)
        .stroke();`;
      case 'PHYSIOTHERAPY':
        return `doc
        .save()
        .moveTo(189, 498)
        .lineTo(171, 482)
        .moveTo(189, 482)
        .lineTo(498)
        .stroke();`;
      case 'VEST':
        return `doc
        .save()
        .moveTo(318, 498)
        .lineTo(301, 482)
        .moveTo(318, 482)
        .lineTo(301, 498)
        .stroke();`;
      case 'SURGERY':
        return `doc
        .save()
        .moveTo(438, 498)
        .lineTo(422, 482)
        .moveTo(438, 482)
        .lineTo(422, 498)
        .stroke();`;
    }
  }
}
