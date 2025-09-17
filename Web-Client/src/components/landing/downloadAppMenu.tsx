import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export function DownloadAppMenu() {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-lg shadow hover:bg-blue-700 transition-colors">
                    📱 Descargar App
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
                side="bottom"
                align="center"
                sideOffset={8}
                className="bg-white rounded-lg shadow-lg p-2 w-56 border border-gray-200"
            >
                <DropdownMenu.Item
                    className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md cursor-pointer flex items-center gap-2"
                    onClick={() => window.open("movil/user", "_blank")}
                >
                    👤 App de Usuario
                </DropdownMenu.Item>

                <DropdownMenu.Item
                    className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md cursor-pointer flex items-center gap-2"
                    onClick={() => window.open("movil/driver", "_blank")}
                >
                    🚗 App de Conductor
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}
