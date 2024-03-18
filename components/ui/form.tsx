
import {createTsForm, createUniqueFieldSchema} from "@ts-react/form"
import { z } from "zod"
import TextField from "./text-field"
import NumberField from "./number-field"
import ImageUploadField from "./image-upload-field"
import CheckBoxField from "./check-box-field"
import SelectField from "./select-field"

export const descriptionSchema = createUniqueFieldSchema(
    z.string(),
    "description" 
)

export const imageUploadSchema = createUniqueFieldSchema(
    z.string(),
    "imageUpload"
)

export const categorySchema = createUniqueFieldSchema(
    z.string(),
    "category" 
)

export const optionalDescriptionSchema = createUniqueFieldSchema(
    z.string().optional(),
    "optional description" 
)

export const optionalImageUploadSchema = createUniqueFieldSchema(
    z.string().url().optional(),
    "optional imageUpload" 
)

export const optionalcategorySchema = createUniqueFieldSchema(
    z.string().optional(),
    "optional category" 
)
export const optionalProjectSchema = createUniqueFieldSchema(
    z.string().optional(),
    "optional projectData" 
)

const mapping = [
    [z.string(), TextField],
    [z.number(), NumberField],
    [imageUploadSchema, ImageUploadField],
    [categorySchema, SelectField],
    [optionalImageUploadSchema, ImageUploadField],
    [optionalcategorySchema, SelectField],
] as const 


const TSForm = createTsForm(mapping)

export default TSForm