import { useEffect } from "react";
type TinyInputProps = {
  id?: string; // opsional
};

export default  function TinyInput({id = "tiny-editor"} :TinyInputProps){

    
      useEffect(() => {
        let tinymce = (window as any).tinymce;
        if (tinymce) {
            tinymce.init({
                selector: "#"+id,
                relative_urls: false,  // Disable relative URLs
                remove_script_host: false, // Prevent TinyMCE from removing the domain from the URL
                formats: {
                    // Changes the default format for h1 to have a class of heading
                    h1: { block: 'h1', classes: "text-5xl font-extrabold" },
                    h2: { block: 'h2', classes: "text-4xl font-extrabold" },
                    h3: { block: 'h3', classes: "text-3xl font-extrabold" },
                    h4: { block: 'h4', classes: "text-2xl font-extrabold" },
                    h5: { block: 'h5', classes: "text-xl font-extrabold" },
                    h6: { block: 'h6', classes: "text-lg font-extrabold" }
                },
                table_class_list: [
                    {title: 'None', value: ''},
                    {title: 'Default Table', value: 'w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'},
                    { title: 'Borders',
                        menu: [
                            { title: 'Red borders', value: 'table_red_borders' },
                            { title: 'Blue borders', value: 'table_blue_borders' },
                            { title: 'Green borders', value: 'table_green_borders' }
                        ]
                    }
                ],
                table_row_class_list: [
                    { title: 'None', value: '' },
                    { title: 'Heading', value: 'text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400' },
                    { title: 'rows-style', value: 'bg-white border-b dark:bg-gray-800 dark:border-gray-700' },
                ],
                table_cell_class_list: [
                    { title: 'None', value: '' },
                    { title: 'column space', value: 'px-6 py-3' },
                ],
                //images_upload_url: "/api/post/upload/image",
                plugins: [
                    "responsivefilemanager", "accordion", "pagebreak", "mathjax", "tiny_mce_wiris", "advlist", "anchor", "autolink", "charmap", "code", "codesample", "fullscreen",
                    "help", "image", "insertdatetime", "link", "lists", "media",
                    "preview", "searchreplace", "table", "visualblocks"
                ],
                toolbar: "undo redo   | responsivefilemanager |charmap | mathjax |tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry | codesample | accordion| styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | pagebreak|link | image",
                content_css: '/resources/css/app.css', // hasil build Tailwind kamu
                body_class: 'prose max-w-none', 
                paste_as_text: true,
                // extended_valid_elements: '*[.*]',
                external_plugins: {
                    "responsivefilemanager":  "/vendor/tinymce/plugins/filemanager/plugin.js",
                    "mathjax":  "/vendor/tinymce_mathjax/plugin.js",
                    // "toc":  "/vendor/tableofcontents/plugin.js",
                    "tiny_mce_wiris":  "/vendor/@wiris/mathtype-tinymce6/plugin.min.js",
        
                },
                external_filemanager_path:  "/vendor/responsive_filemanager/filemanager/",
                filemanager_title: "RESPONSIVE FileManager",
                mathjax: {
                    lib:  "/vendor/mathjax/es5/tex-mml-chtml.js", //required path to mathjax
                    symbols: {
                        start: '\\(',
                        end: '\\)'
                    }, //optional: mathjax symbols
                    className: "math-tex", //optional: mathjax element class
                    configUrl:  "/vendor/dimakorotkov/config.js", /// '/your-path-to-plugin/@dimakorotkov/tinymce-mathjax/config.js' //optional: mathjax config js
                },
                extended_valid_elements: "*[.*]",
                paste_block_drop: false,
                paste_data_images: true,
                // paste_as_text: true,
                wirisimagebgcolor: '#FFFFFF',
                wirisimagesymbolcolor: '#000000',
                wiristransparency: 'true',
                wirisimagefontsize: '16',
                wirisimagenumbercolor: '#000000',
                wirisimageidentcolor: '#000000',
                wirisformulaeditorlang: 'es',
        
                setup: function(editor) {
                    editor.on('init', function(e) {
                        editor.execCommand('mceTableOfContents');
        
                    });
                    editor.on('change', function() {
                        editor.save();  
                        console.log(editor.getContent())
                    
                    });
                },
            });

            return () => {
                if (tinymce && tinymce.get(id)) {
                    tinymce.remove(tinymce.get(id));
                }
            };
        }
      }, [id]);
 
    return(
        <textarea id={id}></textarea>
    ) 
}