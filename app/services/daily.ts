import models, { LogItemCreationAttributes, LogItemAttributes } from '@/models'
import { Op } from 'sequelize'

export const queryAllLogItemByDate = (
  date: string
): Promise<LogItemAttributes[]> => {
  return models.logItems.findAll({
    where: {
      date
    },
    order: [['createdAt', 'desc']]
  })
}

export const queryAllLogsByMonth = (
  monthStr: string
): Promise<LogItemAttributes[]> => {
  return models.logItems.findAll({
    where: {
      date: {
        [Op.like]: `${monthStr}-%`
      }
    },
    order: [['createdAt', 'desc']]
  })
}

export const queryAllDeleted = (): Promise<LogItemAttributes[]> => {
  return models.logItems.findAll({
    paranoid: false,
    where: {
      deletedAt: {
        [Op.not]: null
      }
    },
    order: [['date', 'desc']]
  })
}

export const restoreDeletedById = (id: string): Promise<any> => {
  return models.logItems.restore({
    where: {
      id
    }
  })
}

export const deleteByIdForce = (id: string) => {
  return models.logItems.destroy({
    where: {
      id
    },
    force: true
  })
}

export const createLogItem = (attributes: LogItemCreationAttributes) => {
  return models.logItems.create(attributes)
}

export const deleteById = (id: string) => {
  return models.logItems.destroy({
    where: {
      id
    }
  })
}
