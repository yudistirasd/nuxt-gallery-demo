import ImageAction from "@/components/image-action.vue";
import type { Image, ImageActionProps } from "@/types";
import { describe, it, expect, vi, Mock } from "vitest";
import { mount } from "@vue/test-utils";
import { useRouter } from "vue-router";

import * as utils from "@/composables/utils";

const exampleImage: Image = {
    idx: 0,
    filename: "Atacama-Desert-Chile.jpg",
    alt: "Atacama Desert Chile",
    src: "/_nuxt/public/images/Atacama-Desert-Chile.jpg",
    width: 1,
    height: 1,
};

describe("ImageAction", async () => {
    it("should navigate to index page when action is type close", async () => {
        vi.mock("vue-router");

        (<Mock>useRouter).mockReturnValue({
            push: vi.fn(),
        });

        const wrapper = mount(ImageAction, {
            props: <ImageActionProps>{
                image: exampleImage,
                action: "close",
            },
        });

        const button = wrapper.find("button");

        await button.trigger("click");

        expect(useRouter().push).toHaveBeenCalledWith("/");
    });

    it("should open original image in new tab when action is type source", async () => {
        const windowSpy = vi.spyOn(window, "open");

        const wrapper = mount(ImageAction, {
            props: <ImageActionProps>{
                image: exampleImage,
                action: "source",
            },
        });

        const button = wrapper.find("button");

        await button.trigger("click");

        expect(windowSpy).toHaveBeenCalledWith(exampleImage.src, "_blank");
    });

    it("should download image when action is type download", async () => {
        const downloadImageSpy = vi.spyOn(utils, "downloadImage");

        const wrapper = mount(ImageAction, {
            props: <ImageActionProps>{
                image: exampleImage,
                action: "download",
            },
        });

        const button = wrapper.find("button");

        await button.trigger("click");

        expect(downloadImageSpy).toHaveBeenCalledWith(exampleImage);
    });

    it("should have correct aria label for button depending on action prop", () => {
        const ariaLabel = {
            close: "close image",
            download: "download image",
            source: "open original in new tab",
        };

        Object.entries(ariaLabel).forEach(([key, value]) => {
            const wrapper = mount(ImageAction, {
                props: <ImageActionProps>{
                    image: exampleImage,
                    action: key,
                },
            });
            const button = wrapper.find("button");
            expect(button.attributes("aria-label")).toEqual(value);
        });
    });
});
