import * as log4js from 'log4js'
log4js.configure({
  appenders: {
    stdout: { type: 'stdout' },
    req: {
      type: 'dateFile',
      filename: 'logs/reqlog/req.log',
      pattern: 'yyyy-MM-dd',
      alwaysIncludePattern: true,
      keepFileExt: true,
      daysToKeep: 30,
    },
    err: {
      type: 'dateFile',
      filename: 'logs/errlog/err.log',
      pattern: 'yyyy-MM-dd',
      alwaysIncludePattern: true,
      keepFileExt: true,
      daysToKeep: 30,
    },
    oth: {
      type: 'dateFile',
      filename: 'logs/othlog/oth.log',
      pattern: 'yyyy-MM-dd',
      alwaysIncludePattern: true,
      keepFileExt: true,
      daysToKeep: 30,
    },
  },
  categories: {
    default: { appenders: ['stdout'], level: 'debug' },
    req: { appenders: ['stdout', 'req'], level: 'debug' },
    err: { appenders: ['stdout', 'err'], level: 'error' },
    oth: { appenders: ['stdout', 'oth'], level: 'info' },
  },
})

export function getLogger(name?: string) {
  return log4js.getLogger(name || 'default')
}
