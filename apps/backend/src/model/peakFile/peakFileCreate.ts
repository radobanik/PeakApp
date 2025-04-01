import z from "zod";

type PeakFileCreate = {
    name: string;
    contentType: string;
    path: string;
};

const validate = (entity: PeakFileCreate) => {
    return z.object({
        name: z.string().min(1, "Name must not be empty"),
        contentType: z.string().regex(
          /^(application|audio|font|image|message|model|multipart|text|video|x-(?:[a-z0-9]+))\/[a-z0-9\-\+\.]+$/,
          "Invalid MIME type"
        ),
        path: z.string().min(1, "Path must not be empty"),
      }).strict().safeParse(entity);
  };

export type { PeakFileCreate };
export { validate };
