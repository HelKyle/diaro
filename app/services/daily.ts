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

export const query = ({
  deleted,
  like,
  flag
}: {
  deleted?: boolean
  like?: string
  flag?: number
} = {}): Promise<LogItemAttributes[]> => {
  return models.logItems.findAll({
    paranoid: !deleted,
    where: {
      ...(deleted
        ? {
            deletedAt: {
              [Op.not]: null
            }
          }
        : {}),
      ...(like
        ? {
            content: {
              [Op.like]: `%${like}%`
            }
          }
        : {}),
      ...(typeof flag === 'undefined'
        ? {}
        : {
            flag
          })
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
