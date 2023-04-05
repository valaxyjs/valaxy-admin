#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod cmd;

use tauri::{AboutMetadata, CustomMenuItem, Menu, MenuItem, Submenu};

fn main() {
    tauri::Builder::default()
        .menu(get_menu())
        .on_menu_event(|event| {
            let menu_id = event.menu_item_id();
            event.window().emit("menu_id", menu_id).expect("");
            // 自定义菜单的点击事件
            println!("You click: {:?}", event.menu_item_id());
        })
        // listen
        .invoke_handler(tauri::generate_handler![cmd::open_folder])
        .plugin(tauri_plugin_fs_extra::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// custom menu
pub fn get_menu() -> Menu {
    let authors = vec!["YunYouJun".to_string()];
    let about_metadata = AboutMetadata::new()
        .version("0.1.0")
        .authors(authors)
        .website("https://valaxy.site".to_string())
        .copyright("YunYouJun".to_string())
        .license("MIT".to_string());
    let about_menu =
        Menu::new().add_native_item(MenuItem::About("Valaxy Admin".to_string(), about_metadata));

    // file menu
    let open_folder = CustomMenuItem::new("open", "Open Folder").accelerator("CmdOrControl+F");
    let create_item = CustomMenuItem::new("create", "New File").accelerator("CmdOrControl+N");

    // menu
    let file_menu = Menu::new()
        .add_item(open_folder)
        .add_native_item(MenuItem::Separator)
        .add_item(create_item);

    let window_menu = Menu::new()
        .add_native_item(MenuItem::Minimize)
        .add_native_item(MenuItem::Zoom)
        .add_native_item(MenuItem::Hide)
        .add_native_item(MenuItem::Quit);

    Menu::new()
        .add_submenu(Submenu::new("About", about_menu))
        .add_submenu(Submenu::new("File", file_menu))
        .add_submenu(Submenu::new("Window", window_menu))
}
