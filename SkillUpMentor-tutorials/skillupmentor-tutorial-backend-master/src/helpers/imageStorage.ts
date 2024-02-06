const FileType = import('file-type')
import fs from 'fs'
import Logging from 'library/logging'
import { diskStorage, Options } from 'multer'
import { extname } from 'path'

type validFileExtentionsType = 'png' | 'jpeg' | 'jpg'
type validMimeType = 'image/png' | 'image/jpeg' | 'image/jpg'

const validFileExtentions: validFileExtentionsType[] = ['png', 'jpeg', 'jpg']
const validMimeTypes: validMimeType[] = ['image/jpeg', 'image/jpg', 'image/png']


export const saveImageToStorage: Options = {
    storage: diskStorage({
        destination: './files',
        filename(req, file, callcack) {
            // create unique suffix
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()*1e9)
            // get file extention
            const ext = extname(file.originalname)
            // write filename
            const filename = `${uniqueSuffix}${ext}`

            callcack(null, filename)
        }
    }),

    fileFilter(req, file, callcack) {
        const allowedMimeTypes: validMimeType[] = validMimeTypes
        allowedMimeTypes.includes(file.mimetype as validMimeType) ? callcack(null, true) : callcack(null, false)

    }
}

export const isFileExtentionSafe = async (fullFilePath: string): Promise<boolean> => {
    return (await FileType).fileTypeFromFile(fullFilePath).then((fileExtensionAndMimeType) => {
        if(!fileExtensionAndMimeType?.ext) return false

        const isFileTypeLegit = validFileExtentions.includes(fileExtensionAndMimeType.ext as validFileExtentionsType)
        const isMimeTypeLegit = validMimeTypes.includes(fileExtensionAndMimeType.mime as validMimeType)

        const isFileLegit = isFileTypeLegit && isMimeTypeLegit
        return isFileLegit
    })
}

export const removeFile = (fullFilePath: string): void => {
    try {
        fs.unlinkSync(fullFilePath)
    } catch (error) {
        Logging.error(error)
    }
}